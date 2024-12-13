import { OAUTH_ENDPOINTS, OAUTH_SCOPES } from '../constants'
import type { GoogleProfile, OAuthProfile } from '../types'

export async function getGoogleUserProfile(accessToken: string): Promise<OAuthProfile> {
  const response = await fetch(OAUTH_ENDPOINTS.GOOGLE.USER_INFO, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch Google user profile')
  }

  const data: GoogleProfile = await response.json()

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    firstName: data.given_name,
    lastName: data.family_name,
    image: data.picture,
    provider: 'google'
  }
}

export function getGoogleOAuthURL(clientId: string, redirectUri: string, state: string) {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: OAUTH_SCOPES.GOOGLE.join(' '),
    state,
    access_type: 'offline',
    prompt: 'consent',
  })

  return `${OAUTH_ENDPOINTS.GOOGLE.AUTH}?${params.toString()}`
}