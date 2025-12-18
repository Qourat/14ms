import { refreshAccessToken } from '../lib/tiktok/auth'
import { initDirectPost, getPublishStatus } from '../lib/tiktok/api'

export interface TikTokUploadOptions {
  accessToken: string
  refreshToken: string
  tokenExpiresAt: string
  videoBuffer: Buffer
  caption: string
  hashtags: string[]
  privacyLevel: 'public' | 'friends' | 'private'
  allowComments: boolean
  allowDuet: boolean
  allowStitch: boolean
}

export async function uploadToTikTok(
  options: TikTokUploadOptions,
  onProgress?: (progress: number) => void
): Promise<string> {
  let accessToken = options.accessToken

  // Refresh token if needed
  if (new Date(options.tokenExpiresAt) <= new Date()) {
    const tokens = await refreshAccessToken(options.refreshToken)
    accessToken = tokens.access_token
  }

  const videoSize = options.videoBuffer.length
  const chunkSize = 10 * 1024 * 1024 // 10MB
  const totalChunks = Math.ceil(videoSize / chunkSize)

  const privacyMap = {
    public: 'PUBLIC_TO_EVERYONE',
    friends: 'MUTUAL_FOLLOW_FRIENDS',
    private: 'SELF_ONLY',
  } as const

  // Initialize upload
  const { upload_url, publish_id } = await initDirectPost(accessToken, {
    post_info: {
      title: `${options.caption || ''} ${options.hashtags.join(' ')}`.trim().slice(0, 2200),
      privacy_level: privacyMap[options.privacyLevel],
      disable_duet: !options.allowDuet,
      disable_comment: !options.allowComments,
      disable_stitch: !options.allowStitch,
    },
    source_info: {
      source: 'FILE_UPLOAD',
      video_size: videoSize,
      chunk_size: chunkSize,
      total_chunk_count: totalChunks,
    },
  })

  // Upload chunks
  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize
    const end = Math.min(start + chunkSize, videoSize)
    const chunk = options.videoBuffer.slice(start, end)

    const response = await fetch(upload_url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Range': `bytes ${start}-${end - 1}/${videoSize}`,
      },
      body: chunk,
    })

    if (!response.ok) {
      throw new Error(`Chunk upload failed: ${response.statusText}`)
    }

    if (onProgress) {
      const progress = Math.floor(((i + 1) / totalChunks) * 90)
      onProgress(progress)
    }
  }

  // Poll for publish status
  let attempts = 0
  const maxAttempts = 30

  while (attempts < maxAttempts) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const status = await getPublishStatus(accessToken, publish_id)

    if (status.status === 'PUBLISH_COMPLETE') {
      if (onProgress) onProgress(100)
      return publish_id
    } else if (status.status === 'FAILED') {
      throw new Error('TikTok publish failed')
    }

    attempts++
  }

  throw new Error('Publish timeout')
}

