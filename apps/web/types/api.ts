export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export interface YouTubeVideoInfo {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  duration: number
  channelName: string
  channelId: string
  publishedAt: string
}

export interface TikTokUserInfo {
  open_id: string
  union_id: string
  avatar_url: string
  display_name: string
  username: string
}

export interface JobStatus {
  id: string
  status: 'pending' | 'active' | 'completed' | 'failed' | 'cancelled'
  progress: number
  error_message?: string | null
}

