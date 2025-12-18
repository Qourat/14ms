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
    const response = await fetch('/api/tiktok/auth')
    const { authUrl } = await response.json()
    window.location.href = authUrl
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

