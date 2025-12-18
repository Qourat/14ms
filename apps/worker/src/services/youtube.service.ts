import ytdl from '@distube/ytdl-core'

export interface VideoInfo {
  title: string
  duration: number
  formats: ytdl.videoFormat[]
}

export async function getVideoInfo(videoId: string): Promise<VideoInfo> {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
  const info = await ytdl.getInfo(videoUrl)
  
  return {
    title: info.videoDetails.title,
    duration: parseInt(info.videoDetails.lengthSeconds),
    formats: info.formats,
  }
}

export async function downloadVideo(
  videoId: string,
  onProgress?: (progress: number) => void
): Promise<Buffer> {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
  const info = await ytdl.getInfo(videoUrl)
  
  const format = ytdl.chooseFormat(info.formats, {
    quality: 'highest',
    filter: (format) => 
      format.container === 'mp4' && 
      format.hasVideo && 
      format.hasAudio,
  })
  
  const stream = ytdl(videoUrl, { format })
  const chunks: Buffer[] = []
  const totalSize = format.contentLength || 0
  
  for await (const chunk of stream) {
    chunks.push(chunk)
    if (onProgress && totalSize > 0) {
      const progress = Math.floor((Buffer.concat(chunks).length / totalSize) * 100)
      onProgress(progress)
    }
  }
  
  return Buffer.concat(chunks)
}

