declare namespace Auth {
  export type User = {
    id: number
    email: string
    password: string
    firstName: string
    lastName: string
    name: string
    image?: string
    provider?: string
    createdAt: Date
    updatedAt: Date
  }

  export type Session = {
    id: string
    userId: number
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
  }

  export type AuthResponse = {
    error?: string
    success?: boolean
    user?: Partial<User>
  }

  export type JWTPayload = {
    userId: number
    sessionToken: string
    type: 'session'
  }
} 