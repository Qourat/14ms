import { z } from 'zod'

const YOUTUBE_SHORTS_MAX_DURATION = 60 // seconds

export const youtubeUrlSchema = z.string().refine((url) => {
  const patterns = [
    /^https?:\/\/(www\.)?youtube\.com\/shorts\/[\w-]+/,
    /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
    /^https?:\/\/youtu\.be\/[\w-]+/,
  ]
  return patterns.some((pattern) => pattern.test(url))
}, 'Invalid YouTube URL')

export function extractVideoId(url: string): string | null {
  const patterns = [
    /youtube\.com\/shorts\/([\w-]+)/,
    /youtube\.com\/watch\?v=([\w-]+)/,
    /youtu\.be\/([\w-]+)/,
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
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

export async function getVideoInfo(videoId: string): Promise<YouTubeVideoInfo> {
  const apiKey = process.env.YOUTUBE_API_KEY
  
  if (!apiKey) {
    throw new Error('YouTube API key not configured')
  }
  
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?` +
    `id=${videoId}&key=${apiKey}&part=snippet,contentDetails`
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch video info')
  }
  
  const data = await response.json()
  
  if (!data.items || data.items.length === 0) {
    throw new Error('Video not found')
  }
  
  const video = data.items[0]
  const duration = parseDuration(video.contentDetails.duration)
  
  if (duration > YOUTUBE_SHORTS_MAX_DURATION) {
    throw new Error('Video exceeds maximum duration for Shorts (60 seconds)')
  }
  
  return {
    id: video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    thumbnailUrl: video.snippet.thumbnails.maxres?.url || 
                  video.snippet.thumbnails.high?.url,
    duration,
    channelName: video.snippet.channelTitle,
    channelId: video.snippet.channelId,
    publishedAt: video.snippet.publishedAt,
  }
}

function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  
  const hours = parseInt(match[1] || '0', 10)
  const minutes = parseInt(match[2] || '0', 10)
  const seconds = parseInt(match[3] || '0', 10)
  
  return hours * 3600 + minutes * 60 + seconds
}

