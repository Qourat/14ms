import { supabase } from '../lib/supabase'

export async function uploadVideo(
  path: string,
  buffer: Buffer,
  contentType: string = 'video/mp4'
): Promise<void> {
  const { error } = await supabase.storage
    .from('videos')
    .upload(path, buffer, {
      contentType,
      upsert: true,
    })

  if (error) {
    throw new Error(`Storage upload failed: ${error.message}`)
  }
}

export async function downloadVideo(path: string): Promise<Buffer> {
  const { data, error } = await supabase.storage
    .from('videos')
    .download(path)

  if (error || !data) {
    throw new Error(`Storage download failed: ${error?.message || 'Unknown error'}`)
  }

  return Buffer.from(await data.arrayBuffer())
}

export async function deleteVideo(path: string): Promise<void> {
  const { error } = await supabase.storage
    .from('videos')
    .remove([path])

  if (error) {
    throw new Error(`Storage delete failed: ${error.message}`)
  }
}

