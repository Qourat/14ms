'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database'

type TikTokAccount = Database['public']['Tables']['tiktok_accounts']['Row']

export function useTikTok() {
  const [accounts, setAccounts] = useState<TikTokAccount[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const fetchAccounts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('tiktok_accounts')
      .select('*')
      .eq('is_active', true)

    if (!error && data) {
      setAccounts(data)
    }
    setLoading(false)
  }

  const connectAccount = async () => {
    try {
      const response = await fetch('/api/tiktok/auth')
      
      if (!response.ok) {
        throw new Error(`Failed to get auth URL: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      
      if (!data.success || !data.authUrl) {
        throw new Error(data.error || 'Invalid response from server')
      }
      
      window.location.href = data.authUrl
    } catch (error) {
      console.error('Failed to connect TikTok account:', error)
      throw error
    }
  }

  const disconnectAccount = async (accountId: string) => {
    const { error } = await supabase
      .from('tiktok_accounts')
      .update({ is_active: false })
      .eq('id', accountId)

    if (error) throw error
    await fetchAccounts()
  }

  return {
    accounts,
    loading,
    connectAccount,
    disconnectAccount,
    fetchAccounts,
  }
}

