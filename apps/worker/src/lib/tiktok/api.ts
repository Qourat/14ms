const TIKTOK_API_BASE = 'https://open.tiktokapis.com/v2'

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
  
  const data = await response.json() as {
    error?: { code?: string; message?: string }
    data?: UploadInitResponse
  }
  
  if (data.error?.code !== 'ok') {
    throw new Error(data.error?.message || 'Failed to initialize upload')
  }
  
  if (!data.data) {
    throw new Error('No data returned from upload init')
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
  
  const data = await response.json() as {
    error?: { code?: string; message?: string }
    data?: { status: string; publish_id: string; uploaded_bytes?: number }
  }
  
  if (data.error?.code !== 'ok') {
    throw new Error(data.error?.message || 'Failed to fetch publish status')
  }
  
  if (!data.data) {
    throw new Error('No data returned from publish status')
  }
  
  return data.data
}

