import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { chat } from '@/lib/openrouter/client'
import { generateCaptionPrompt, generateHashtagsPrompt } from '@/lib/openrouter/prompts'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { title, description, includeHashtags = true } = await request.json()
    
    if (!title) {
      return NextResponse.json(
        { error: 'Video title is required' },
        { status: 400 }
      )
    }
    
    // Generate caption
    const captionMessages = generateCaptionPrompt(title, description || '', 'tiktok')
    const caption = await chat(captionMessages)
    
    let hashtags: string[] = []
    
    if (includeHashtags) {
      // Generate hashtags
      const hashtagMessages = generateHashtagsPrompt(title, caption)
      const hashtagResponse = await chat(hashtagMessages)
      hashtags = hashtagResponse
        .split(/\s+/)
        .filter((tag) => tag.startsWith('#'))
        .slice(0, 8)
    }
    
    return NextResponse.json({
      success: true,
      data: {
        caption,
        hashtags,
      },
    })
  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}

