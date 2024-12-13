declare namespace Auth {

  export type Session = {
    id: string
    userId: number
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
  }

  export type User = {
    id: number
    email: string
    password: string
    firstName: string | null
    lastName: string | null
    name: string | null
    image: string | null
    provider: string | null
    emailVerified: Date | null
  }
  
  export type AuthResponse = {
    success?: boolean
    error?: string
    user?: User
  }
  

  export type JWTPayload = {
    userId: number
    sessionToken: string
    type: 'session'
  }
} 