'use server'

import type { OAuthProvider, OAuthResponse } from './types'

export async function oauthLogin(
	provider: OAuthProvider
): Promise<OAuthResponse> {
	try {
		console.log('Server: Starting OAuth login for provider:', provider)
		const redirectUrl = `/api/auth/${provider}`
		console.log('Server: Generated redirect URL:', redirectUrl)
		return { success: true, redirectUrl }
	} catch (error) {
		console.error(`Server: ${provider} login error:`, error)
		return { success: false, error: `Failed to initiate ${provider} login` }
	}
}
