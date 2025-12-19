import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { exchangeCodeForTokens } from '@/lib/tiktok/auth'
import { getUserInfo } from '@/lib/tiktok/api'
import { cookies } from 'next/headers'
import { constantTimeEquals } from '@/lib/utils/security'

const STATE_COOKIE_NAME = 'tiktok_oauth_state'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.redirect(new URL('/login?error=auth', request.url))
    }
    
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const receivedState = searchParams.get('state')
    const error = searchParams.get('error')
    
    if (error) {
      return NextResponse.redirect(new URL(`/settings?error=${error}`, request.url))
    }
    
    if (!code) {
      return NextResponse.redirect(new URL('/settings?error=no_code', request.url))
    }
    
    // CRITICAL: Validate state parameter to prevent CSRF attacks
    if (!receivedState) {
      console.error('TikTok OAuth callback: Missing state parameter')
      return NextResponse.redirect(new URL('/settings?error=invalid_state', request.url))
    }
    
    // Retrieve stored state from secure cookie
    const cookieStore = await cookies()
    const storedState = cookieStore.get(STATE_COOKIE_NAME)?.value
    
    if (!storedState) {
      console.error('TikTok OAuth callback: No stored state found')
      return NextResponse.redirect(new URL('/settings?error=state_expired', request.url))
    }
    
    // Validate state matches using constant-time comparison to prevent timing attacks
    if (!constantTimeEquals(storedState, receivedState)) {
      console.error('TikTok OAuth callback: State mismatch - possible CSRF attack')
      // Clear the invalid state cookie
      cookieStore.delete(STATE_COOKIE_NAME)
      return NextResponse.redirect(new URL('/settings?error=state_mismatch', request.url))
    }
    
    // State is valid - clear the cookie
    cookieStore.delete(STATE_COOKIE_NAME)
    
    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code)
    
    // Get user info from TikTok
    const tiktokUser = await getUserInfo(tokens.access_token)
    
    // Calculate token expiration
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString()
    
    // Save or update TikTok account
    const { error: upsertError } = await supabase
      .from('tiktok_accounts')
      .upsert({
        user_id: user.id,
        tiktok_user_id: tokens.open_id,
        tiktok_username: tiktokUser.username,
        display_name: tiktokUser.display_name,
        avatar_url: tiktokUser.avatar_url,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expires_at: expiresAt,
        scopes: tokens.scope.split(','),
        is_active: true,
      }, {
        onConflict: 'user_id,tiktok_user_id',
      })
    
    if (upsertError) {
      console.error('TikTok account upsert error:', upsertError)
      return NextResponse.redirect(new URL('/settings?error=save_failed', request.url))
    }
    
    return NextResponse.redirect(new URL('/settings?success=tiktok_connected', request.url))
  } catch (error) {
    console.error('TikTok callback error:', error)
    return NextResponse.redirect(new URL('/settings?error=callback_failed', request.url))
  }
}

