'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database'

type Import = Database['public']['Tables']['imports']['Row']

export function useImports() {
  const [imports, setImports] = useState<Import[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchImports()
  }, [])

  const fetchImports = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('imports')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setImports(data)
    }
    setLoading(false)
  }

  const createImport = async (youtubeUrl: string) => {
    const response = await fetch('/api/youtube/fetch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: youtubeUrl }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch video')
    }

    const { data: videoInfo } = await response.json()

    const { data, error } = await supabase
      .from('imports')
      .insert({
        youtube_url: youtubeUrl,
        youtube_video_id: videoInfo.id,
        youtube_title: videoInfo.title,
        youtube_description: videoInfo.description,
        youtube_thumbnail_url: videoInfo.thumbnailUrl,
        youtube_duration: videoInfo.duration,
        youtube_channel_name: videoInfo.channelName,
        youtube_channel_id: videoInfo.channelId,
        status: 'pending',
      })
      .select()
      .single()

    if (error) throw error

    // Create download job
    await fetch('/api/jobs/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'download', importId: data.id }),
    })

    await fetchImports()
    return data
  }

  return { imports, loading, createImport, fetchImports }
}

