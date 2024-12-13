import { OAUTH_ENDPOINTS, OAUTH_SCOPES } from '../constants'
import type { GitHubProfile, GitHubEmail, OAuthProfile } from '../types'

export async function getGitHubUserProfile(accessToken: string): Promise<OAuthProfile> {
  const [userResponse, emailsResponse] = await Promise.all([
    fetch(OAUTH_ENDPOINTS.GITHUB.USER_INFO, {
      headers: { 
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    }),
    fetch(OAUTH_ENDPOINTS.GITHUB.USER_EMAILS, {
      headers: { 
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    })
  ])

  if (!userResponse.ok || !emailsResponse.ok) {
    throw new Error('Failed to fetch GitHub user profile')
  }

  const userData: GitHubProfile = await userResponse.json()
  const emails: GitHubEmail[] = await emailsResponse.json()

  const primaryEmail = emails.find(email => email.primary && email.verified)?.email
  if (!primaryEmail) {
    throw new Error('No verified primary email found')
  }

  // Split name into first and last name
  const nameParts = userData.name?.split(' ') || []
  const firstName = nameParts[0] || userData.login
  const lastName = nameParts.slice(1).join(' ') || null

  return {
    id: String(userData.id),
    email: primaryEmail,
    name: userData.name || userData.login,
    firstName,
    lastName,
    image: userData.avatar_url,
    provider: 'github'
  }
}

export function getGitHubOAuthURL(clientId: string, redirectUri: string, state: string) {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: OAUTH_SCOPES.GITHUB.join(' '),
    state,
    allow_signup: 'true',
  })

  return `${OAUTH_ENDPOINTS.GITHUB.AUTH}?${params.toString()}`
}