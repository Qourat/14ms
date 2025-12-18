import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getDownloadQueue, getUploadQueue } from '@/lib/queue/client'

const downloadQueue = getDownloadQueue()
const uploadQueue = getUploadQueue()

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { type, importId, postId } = await request.json()
    
    if (!type || (type === 'download' && !importId) || (type === 'upload' && !postId)) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }
    
    // Create job record in database
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .insert({
        user_id: user.id,
        type,
        reference_id: type === 'download' ? importId : postId,
        reference_type: type === 'download' ? 'import' : 'post',
        status: 'pending',
      })
      .select()
      .single()
    
    if (jobError) {
      throw jobError
    }
    
    // Add to appropriate queue
    if (type === 'download') {
      await downloadQueue.add('download-video', {
        jobId: job.id,
        userId: user.id,
        importId,
      })
    } else if (type === 'upload') {
      await uploadQueue.add('upload-video', {
        jobId: job.id,
        userId: user.id,
        postId,
      })
    }
    
    return NextResponse.json({
      success: true,
      data: { jobId: job.id },
    })
  } catch (error) {
    console.error('Job creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    )
  }
}

