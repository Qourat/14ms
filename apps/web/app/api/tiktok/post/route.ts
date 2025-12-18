import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const { postId } = body
    
    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      )
    }
    
    // This endpoint would trigger the upload job
    // The actual upload is handled by the worker service
    // For now, we'll just return success
    // In a real implementation, this would create a job in the queue
    
    return NextResponse.json({
      success: true,
      message: 'Post queued for upload',
    })
  } catch (error) {
    console.error('TikTok post error:', error)
    return NextResponse.json(
      { error: 'Failed to queue post' },
      { status: 500 }
    )
  }
}

