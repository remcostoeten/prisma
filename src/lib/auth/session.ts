import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'
import prisma from '@/server/db'
import { AUTH_COOKIE_NAME, SESSION_DURATION } from './constants'

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

export async function createSession(userId: number) {
  const sessionToken = uuidv4()
  const expiresAt = new Date(Date.now() + SESSION_DURATION)

  const session = await prisma.session.create({
    data: {
      id: sessionToken,
      userId,
      expiresAt,
    },
  })

  const token = await new SignJWT({ 
    userId,
    sessionToken: session.id,
    type: 'session'
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresAt.getTime() / 1000)
    .sign(secretKey)

  ;(await cookies()).set(AUTH_COOKIE_NAME, token, { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt
  })

  return session
}