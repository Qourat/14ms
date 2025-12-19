import ytdl from '@distube/ytdl-core'

export interface VideoInfo {
  title: string
  duration: number
  formats: ytdl.videoFormat[]
}

export async function getVideoInfo(videoId: string): Promise<VideoInfo> {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
  const info = await ytdl.getInfo(videoUrl)
  
  const lengthSeconds = typeof info.videoDetails.lengthSeconds === 'string'
    ? parseInt(info.videoDetails.lengthSeconds, 10)
    : Number(info.videoDetails.lengthSeconds)
  
  return {
    title: info.videoDetails.title,
    duration: lengthSeconds,
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
  const contentLength = format.contentLength
  const totalSize = typeof contentLength === 'string' 
    ? parseInt(contentLength, 10) 
    : (typeof contentLength === 'number' ? contentLength : 0)
  
  for await (const chunk of stream) {
    chunks.push(chunk)
    if (onProgress && totalSize > 0) {
      const currentLength = Buffer.concat(chunks).length
      const progress = Math.floor((currentLength / totalSize) * 100)
      onProgress(progress)
    }
  }
  
  return Buffer.concat(chunks)
}

