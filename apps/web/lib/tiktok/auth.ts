const TIKTOK_AUTH_URL = 'https://www.tiktok.com/v2/auth/authorize/'
const TIKTOK_TOKEN_URL = 'https://open.tiktokapis.com/v2/oauth/token/'

export interface TikTokTokens {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  scope: string
  open_id: string
}

export function generateAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_key: process.env.TIKTOK_CLIENT_KEY!,
    scope: 'user.info.basic,video.publish,video.upload',
    response_type: 'code',
    redirect_uri: process.env.TIKTOK_REDIRECT_URI!,
    state,
  })
  
  return `${TIKTOK_AUTH_URL}?${params.toString()}`
}

export async function exchangeCodeForTokens(code: string): Promise<TikTokTokens> {
  const response = await fetch(TIKTOK_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY!,
      client_secret: process.env.TIKTOK_CLIENT_SECRET!,
      code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.TIKTOK_REDIRECT_URI!,
    }),
  })
  
  const data = await response.json()
  
  if (data.error) {
    throw new Error(data.error_description || 'Token exchange failed')
  }
  
  return data
}

export async function refreshAccessToken(refreshToken: string): Promise<TikTokTokens> {
  const response = await fetch(TIKTOK_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY!,
      client_secret: process.env.TIKTOK_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })
  
  const data = await response.json()
  
  if (data.error) {
    throw new Error(data.error_description || 'Token refresh failed')
  }
  
  return data
}

