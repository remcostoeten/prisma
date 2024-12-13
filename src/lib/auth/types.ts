export type OAuthProvider = 'google' | 'github'

export type OAuthProfile = {
  id: string
  email: string
  name: string | null
  firstName: string | null
  lastName: string | null
  image: string | null
  provider: OAuthProvider
}

export type GoogleProfile = {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}

export type GitHubProfile = {
  id: number
  login: string
  name: string | null
  avatar_url: string
  email: string | null
}

export type GitHubEmail = {
  email: string
  primary: boolean
  verified: boolean
  visibility: string | null
}