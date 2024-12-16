'use client'

import { OAuthProvider } from '@/server/mutations/oauth'
import { useState } from 'react'
import { toast } from 'sonner'
import { oauthLogin } from '@/server/mutations'

export function useOAuth() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleOAuthLogin = async (provider: OAuthProvider) => {
		if (loading) return

		try {
			console.log('Starting OAuth login for:', provider)
			setLoading(true)
			setError(null)

			console.log('Calling oauthLogin...')
			const result = await oauthLogin(provider)
			console.log('oauthLogin result:', result)

			if (!result.success || !result.redirectUrl) {
				throw new Error(result.error || `Failed to connect to ${provider}`)
			}

			console.log('Redirecting to:', result.redirectUrl)
			// Add a small delay to show loading state
			await new Promise(resolve => setTimeout(resolve, 500))

			// Redirect to OAuth provider
			window.location.href = result.redirectUrl
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
