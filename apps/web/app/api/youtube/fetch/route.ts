import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { extractVideoId, getVideoInfo, youtubeUrlSchema } from '@/lib/youtube/api'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const { url } = body
    
    // Validate URL
    const validationResult = youtubeUrlSchema.safeParse(url)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      )
    }
    
    // Extract video ID
    const videoId = extractVideoId(url)
    if (!videoId) {
      return NextResponse.json(
        { error: 'Could not extract video ID' },
        { status: 400 }
      )
    }
    
    // Get video info from YouTube API
    const videoInfo = await getVideoInfo(videoId)
    
    return NextResponse.json({
      success: true,
      data: videoInfo,
    })
  } catch (error) {
    console.error('YouTube fetch error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch video' },
      { status: 500 }
    )
  }
}

