export type User = {
  id: number
  email: string
  firstName: string | null
  lastName: string | null
  name: string | null
  image: string | null
  provider: string | null
  emailVerified: Date | null
}

export type Session = {
  id: string
  userId: number
  expiresAt: Date
}

export type AuthResponse = {
  success?: boolean
  error?: string
  user?: User
}