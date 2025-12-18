const TIKTOK_TOKEN_URL = 'https://open.tiktokapis.com/v2/oauth/token/'

export interface TikTokTokens {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  scope: string
  open_id: string
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

