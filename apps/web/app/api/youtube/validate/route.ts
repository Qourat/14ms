import { NextRequest, NextResponse } from 'next/server'
import { youtubeUrlSchema, extractVideoId } from '@/lib/youtube/api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url } = body
    
    // Validate URL
    const validationResult = youtubeUrlSchema.safeParse(url)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL', valid: false },
        { status: 400 }
      )
    }
    
    // Extract video ID
    const videoId = extractVideoId(url)
    if (!videoId) {
      return NextResponse.json(
        { error: 'Could not extract video ID', valid: false },
        { status: 400 }
      )
    }
    
    return NextResponse.json({
      success: true,
      valid: true,
      videoId,
    })
  } catch (error) {
    console.error('YouTube validation error:', error)
    return NextResponse.json(
      { error: 'Validation failed', valid: false },
      { status: 500 }
    )
  }
}

