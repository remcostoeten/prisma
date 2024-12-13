'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import type { OAuthProvider } from '@/lib/auth/types'

export function useOAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOAuthLogin = async (provider: OAuthProvider) => {
    try {
      setLoading(true)
      setError(null)
      
      // Start OAuth flow
      window.location.href = `/api/auth/${provider}`
    } catch (error) {
      console.error(`${provider} login failed:`, error)
      const message = error instanceof Error ? error.message : `Failed to login with ${provider}`
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    handleOAuthLogin
  }
}