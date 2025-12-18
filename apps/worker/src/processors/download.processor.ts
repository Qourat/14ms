import { Job } from 'bullmq'
import { supabase } from '../lib/supabase'
import ytdl from '@distube/ytdl-core'

export interface DownloadJobData {
  jobId: string
  userId: string
  importId: string
}

export async function downloadProcessor(job: Job<DownloadJobData>) {
  const { jobId, userId, importId } = job.data
  
  try {
    // Update job status
    await supabase
      .from('jobs')
      .update({ status: 'active', started_at: new Date().toISOString() })
      .eq('id', jobId)
    
    // Get import record
    const { data: importRecord, error: importError } = await supabase
      .from('imports')
      .select('*')
      .eq('id', importId)
      .single()
    
    if (importError || !importRecord) {
      throw new Error('Import record not found')
    }
    
    // Update import status
    await supabase
      .from('imports')
      .update({ status: 'downloading' })
      .eq('id', importId)
    
    // Download video using ytdl-core
    const videoUrl = `https://www.youtube.com/watch?v=${importRecord.youtube_video_id}`
    const info = await ytdl.getInfo(videoUrl)
    
    // Get best quality format under 60 seconds
    const format = ytdl.chooseFormat(info.formats, {
      quality: 'highest',
      filter: (format) => 
        format.container === 'mp4' && 
        format.hasVideo && 
        format.hasAudio,
    })
    
    // Download to buffer
    const stream = ytdl(videoUrl, { format })
    const chunks: Buffer[] = []
    
    for await (const chunk of stream) {
      chunks.push(chunk)
      
      // Update progress
      const progress = Math.min(
        Math.floor((Buffer.concat(chunks).length / (format.contentLength || 1)) * 100),
        99
      )
      
      await supabase
        .from('jobs')
        .update({ progress })
        .eq('id', jobId)
    }
    
    const buffer = Buffer.concat(chunks)
    
    // Upload to Supabase Storage
    const storagePath = `videos/${userId}/${importId}.mp4`
    
    const { error: uploadError } = await supabase.storage
      .from('videos')
      .upload(storagePath, buffer, {
        contentType: 'video/mp4',
        upsert: true,
      })
    
    if (uploadError) {
      throw uploadError
    }
    
    // Update records
    await supabase
      .from('imports')
      .update({
        status: 'ready',
        storage_path: storagePath,
        file_size: buffer.length,
      })
      .eq('id', importId)
    
    await supabase
      .from('jobs')
      .update({
        status: 'completed',
        progress: 100,
        completed_at: new Date().toISOString(),
      })
      .eq('id', jobId)
    
    return { success: true, storagePath }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Download failed'
    
    await supabase
      .from('jobs')
      .update({
        status: 'failed',
        error_message: errorMessage,
        completed_at: new Date().toISOString(),
      })
      .eq('id', jobId)
    
    await supabase
      .from('imports')
      .update({
        status: 'failed',
        error_message: errorMessage,
      })
      .eq('id', importId)
    
    throw error
  }
}

