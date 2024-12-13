import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { AUTH_COOKIE_NAME } from './constants'

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

export async function authMiddleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const { payload } = await jwtVerify(token, secretKey)
    
    if (!payload || typeof payload !== 'object' || !('userId' in payload)) {
      throw new Error('Invalid token payload')
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}