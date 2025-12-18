import { Job } from 'bullmq'
import { supabase } from '../lib/supabase'
import { refreshAccessToken } from '../lib/tiktok/auth'
import { initDirectPost, getPublishStatus } from '../lib/tiktok/api'

export interface UploadJobData {
  jobId: string
  userId: string
  postId: string
}

export async function uploadProcessor(job: Job<UploadJobData>) {
  const { jobId, userId, postId } = job.data
  
  try {
    // Update job status
    await supabase
      .from('jobs')
      .update({ status: 'active', started_at: new Date().toISOString() })
      .eq('id', jobId)
    
    // Get post with related data
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select(`
        *,
        import:imports(*),
        tiktok_account:tiktok_accounts(*)
      `)
      .eq('id', postId)
      .single()
    
    if (postError || !post) {
      throw new Error('Post not found')
    }
    
    // Update post status
    await supabase
      .from('posts')
      .update({ status: 'uploading' })
      .eq('id', postId)
    
    // Check/refresh TikTok token
    let accessToken = (post.tiktok_account as any).access_token
    
    if (new Date((post.tiktok_account as any).token_expires_at) <= new Date()) {
      const tokens = await refreshAccessToken((post.tiktok_account as any).refresh_token)
      
      await supabase
        .from('tiktok_accounts')
        .update({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          token_expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
        })
        .eq('id', (post.tiktok_account as any).id)
      
      accessToken = tokens.access_token
    }
    
    // Download video from Supabase Storage
    const importData = post.import as any
    const { data: videoData, error: downloadError } = await supabase.storage
      .from('videos')
      .download(importData.storage_path)
    
    if (downloadError || !videoData) {
      throw new Error('Failed to download video from storage')
    }
    
    const videoBuffer = Buffer.from(await videoData.arrayBuffer())
    const videoSize = videoBuffer.length
    const chunkSize = 10 * 1024 * 1024 // 10MB chunks
    const totalChunks = Math.ceil(videoSize / chunkSize)
    
    // Initialize TikTok upload
    const privacyMap = {
      public: 'PUBLIC_TO_EVERYONE',
      friends: 'MUTUAL_FOLLOW_FRIENDS',
      private: 'SELF_ONLY',
    } as const
    
    const { upload_url, publish_id } = await initDirectPost(accessToken, {
      post_info: {
        title: `${post.caption || ''} ${(post.hashtags || []).join(' ')}`.trim().slice(0, 2200),
        privacy_level: privacyMap[post.privacy_level as keyof typeof privacyMap],
        disable_duet: !post.allow_duet,
        disable_comment: !post.allow_comments,
        disable_stitch: !post.allow_stitch,
      },
      source_info: {
        source: 'FILE_UPLOAD',
        video_size: videoSize,
        chunk_size: chunkSize,
        total_chunk_count: totalChunks,
      },
    })
    
    // Upload video chunks
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize
      const end = Math.min(start + chunkSize, videoSize)
      const chunk = videoBuffer.slice(start, end)
      
      const response = await fetch(upload_url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'video/mp4',
          'Content-Range': `bytes ${start}-${end - 1}/${videoSize}`,
        },
        body: chunk,
      })
      
      if (!response.ok) {
        throw new Error(`Chunk upload failed: ${response.statusText}`)
      }
      
      // Update progress
      const progress = Math.floor(((i + 1) / totalChunks) * 90)
      await supabase
        .from('jobs')
        .update({ progress })
        .eq('id', jobId)
    }
    
    // Poll for publish status
    let publishStatus
    let attempts = 0
    const maxAttempts = 30
    
    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      publishStatus = await getPublishStatus(accessToken, publish_id)
      
      if (publishStatus.status === 'PUBLISH_COMPLETE') {
        break
      } else if (publishStatus.status === 'FAILED') {
        throw new Error('TikTok publish failed')
      }
      
      attempts++
    }
    
    // Update post as published
    await supabase
      .from('posts')
      .update({
        status: 'published',
        tiktok_video_id: publish_id,
        published_at: new Date().toISOString(),
      })
      .eq('id', postId)
    
    // Complete job
    await supabase
      .from('jobs')
      .update({
        status: 'completed',
        progress: 100,
        completed_at: new Date().toISOString(),
      })
      .eq('id', jobId)
    
    return { success: true, publishId: publish_id }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Upload failed'
    
    await supabase
      .from('jobs')
      .update({
        status: 'failed',
        error_message: errorMessage,
        completed_at: new Date().toISOString(),
      })
      .eq('id', jobId)
    
    await supabase
      .from('posts')
      .update({
        status: 'failed',
        error_message: errorMessage,
      })
      .eq('id', postId)
    
    throw error
  }
}

