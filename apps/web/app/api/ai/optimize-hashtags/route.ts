import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { chat } from '@/lib/openrouter/client'
import { generateHashtagsPrompt } from '@/lib/openrouter/prompts'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { title, caption } = await request.json()
    
    if (!title || !caption) {
      return NextResponse.json(
        { error: 'Title and caption are required' },
        { status: 400 }
      )
    }
    
    // Generate hashtags
    const hashtagMessages = generateHashtagsPrompt(title, caption)
    const hashtagResponse = await chat(hashtagMessages)
    const hashtags = hashtagResponse
      .split(/\s+/)
      .filter((tag) => tag.startsWith('#'))
      .slice(0, 8)
    
    return NextResponse.json({
      success: true,
      data: {
        hashtags,
      },
    })
  } catch (error) {
    console.error('Hashtag optimization error:', error)
    return NextResponse.json(
      { error: 'Failed to optimize hashtags' },
      { status: 500 }
    )
  }
}

