import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
})

export function validateEnv() {
  try {
    const parsed = envSchema.parse(process.env)
    return parsed
  } catch (error) {
    console.error('❌ Invalid environment variables:', error)
    throw new Error('Invalid environment variables')
  }
}

// Validate env vars at startup
validateEnv()