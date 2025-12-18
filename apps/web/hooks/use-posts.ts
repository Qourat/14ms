'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database'

type Post = Database['public']['Tables']['posts']['Row']

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setPosts(data)
    }
    setLoading(false)
  }

  const createPost = async (postData: {
    import_id: string
    tiktok_account_id: string
    caption?: string
    hashtags?: string[]
    privacy_level?: 'public' | 'friends' | 'private'
    scheduled_at?: string
  }) => {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        ...postData,
        status: postData.scheduled_at ? 'scheduled' : 'draft',
      })
      .select()
      .single()

    if (error) throw error
    await fetchPosts()
    return data
  }

  const updatePost = async (id: string, updates: Partial<Post>) => {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    await fetchPosts()
    return data
  }

  const publishPost = async (id: string) => {
    // Create upload job
    const response = await fetch('/api/jobs/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'upload', postId: id }),
    })

    if (!response.ok) throw new Error('Failed to create upload job')

    await updatePost(id, { status: 'uploading' })
  }

  return { posts, loading, createPost, updatePost, publishPost, fetchPosts }
}

