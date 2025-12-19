import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { generateAuthUrl } from '@/lib/tiktok/auth'
import { randomBytes } from 'crypto'
import { cookies } from 'next/headers'

const STATE_COOKIE_NAME = 'tiktok_oauth_state'
const STATE_COOKIE_MAX_AGE = 600 // 10 minutes

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Generate cryptographically secure state token
    const state = randomBytes(32).toString('hex')
    
    // Store state in HTTP-only cookie for verification
    // This prevents CSRF attacks by ensuring only our server can validate the state
    const cookieStore = await cookies()
    cookieStore.set(STATE_COOKIE_NAME, state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: STATE_COOKIE_MAX_AGE,
      path: '/',
    })
    
    // Generate auth URL with state
    const authUrl = generateAuthUrl(state)
    
    return NextResponse.json({
      success: true,
      authUrl,
      // Don't return state to client - it's stored in secure cookie
    })
  } catch (error) {
    console.error('TikTok auth error:', error)
    return NextResponse.json(
      { error: 'Failed to generate auth URL' },
      { status: 500 }
    )
  }
}

