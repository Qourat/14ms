const TIKTOK_API_BASE = 'https://open.tiktokapis.com/v2'

export interface TikTokUserInfo {
  open_id: string
  union_id: string
  avatar_url: string
  display_name: string
  username: string
}

export async function getUserInfo(accessToken: string): Promise<TikTokUserInfo> {
  const response = await fetch(
    `${TIKTOK_API_BASE}/user/info/?fields=open_id,union_id,avatar_url,display_name,username`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  
  const data = await response.json()
  
  if (data.error?.code !== 'ok') {
    throw new Error(data.error?.message || 'Failed to fetch user info')
  }
  
  return data.data.user
}

export interface UploadInitResponse {
  upload_url: string
  publish_id: string
}

export async function initDirectPost(
  accessToken: string,
  options: {
    post_info: {
      title: string
      privacy_level: 'PUBLIC_TO_EVERYONE' | 'MUTUAL_FOLLOW_FRIENDS' | 'SELF_ONLY'
      disable_duet?: boolean
      disable_comment?: boolean
      disable_stitch?: boolean
      video_cover_timestamp_ms?: number
    }
    source_info: {
      source: 'FILE_UPLOAD'
      video_size: number
      chunk_size: number
      total_chunk_count: number
    }
  }
): Promise<UploadInitResponse> {
  const response = await fetch(`${TIKTOK_API_BASE}/post/publish/video/init/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(options),
  })
  
  const data = await response.json()
  
  if (data.error?.code !== 'ok') {
    throw new Error(data.error?.message || 'Failed to initialize upload')
  }
  
  return data.data
}

export async function getPublishStatus(
  accessToken: string,
  publishId: string
): Promise<{ status: string; publish_id: string; uploaded_bytes?: number }> {
  const response = await fetch(
    `${TIKTOK_API_BASE}/post/publish/status/fetch/`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ publish_id: publishId }),
    }
  )
  
  const data = await response.json()
  
  if (data.error?.code !== 'ok') {
    throw new Error(data.error?.message || 'Failed to fetch publish status')
  }
  
  return data.data
}

