import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { generateAuthUrl } from '@/lib/tiktok/auth'
import { randomBytes } from 'crypto'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Generate state token
    const state = randomBytes(32).toString('hex')
    
    // Store state in session or database for verification
    // For now, we'll include it in the redirect URL
    const authUrl = generateAuthUrl(state)
    
    return NextResponse.json({
      success: true,
      authUrl,
      state,
    })
  } catch (error) {
    console.error('TikTok auth error:', error)
    return NextResponse.json(
      { error: 'Failed to generate auth URL' },
      { status: 500 }
    )
  }
}

