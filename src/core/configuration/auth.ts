import { z } from 'zod'

const envSchema = z.object({
  JWT_SECRET: z.string().min(32),
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1)
})

export const AUTH_CONFIG = {
  cookies: {
    token: 'token',
    oauth: 'oauth_state'
  },
  session: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    updateAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  routes: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
    callback: '/auth/callback'
  },
  oauth: {
    github: {
      authUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      userUrl: 'https://api.github.com/user',
      emailUrl: 'https://api.github.com/user/emails',
      scope: ['read:user', 'user:email']
    }
  }
} as const
