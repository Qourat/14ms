import { Job } from 'bullmq'
import { supabase } from '../lib/supabase'
import { generateCaption, generateHashtags } from '../services/ai.service'

export interface ProcessJobData {
  jobId: string
  userId: string
  importId: string
}

export async function processProcessor(job: Job<ProcessJobData>) {
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
      .update({ status: 'processing' })
      .eq('id', importId)
    
    // Generate AI caption and hashtags
    const caption = await generateCaption(
      importRecord.youtube_title || '',
      importRecord.youtube_description || ''
    )
    
    const hashtags = await generateHashtags(
      importRecord.youtube_title || '',
      caption
    )
    
    // Update import with AI-generated content
    // Merge with existing metadata to preserve any existing data
    const existingMetadata = (importRecord.metadata as Record<string, unknown>) || {}
    await supabase
      .from('imports')
      .update({
        status: 'ready',
        metadata: {
          ...existingMetadata,
          ai_caption: caption,
          ai_hashtags: hashtags,
        },
      })
      .eq('id', importId)
    
    // Complete job
    await supabase
      .from('jobs')
      .update({
        status: 'completed',
        progress: 100,
        completed_at: new Date().toISOString(),
        result: { caption, hashtags },
      })
      .eq('id', jobId)
    
    return { success: true, caption, hashtags }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Processing failed'
    
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

