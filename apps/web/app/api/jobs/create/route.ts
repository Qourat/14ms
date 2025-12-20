import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { getDownloadQueue, getUploadQueue } from '@/lib/queue/client'
import type { Database } from '@/types/database'

const downloadQueue = getDownloadQueue()
const uploadQueue = getUploadQueue()

type JobType = Database['public']['Tables']['jobs']['Insert']['type']
type JobReferenceType = Database['public']['Tables']['jobs']['Insert']['reference_type']

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const { type, importId, postId } = body as {
      type: JobType
      importId?: string
      postId?: string
    }
    
    if (!type || (type === 'download' && !importId) || (type === 'upload' && !postId)) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }
    
    // Create job record in database
    const jobData: Database['public']['Tables']['jobs']['Insert'] = {
      user_id: user.id,
      type,
      reference_id: (type === 'download' ? importId : postId) ?? null,
      reference_type: (type === 'download' ? 'import' : 'post') as JobReferenceType,
      status: 'pending',
    }
    
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .insert([jobData] as Database['public']['Tables']['jobs']['Insert'][])
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

