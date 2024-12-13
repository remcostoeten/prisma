import { NextResponse } from 'next/server'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function GET() {
  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    return NextResponse.redirect(new URL('/login?error=OAuth configuration error', APP_URL))
  }

  // State parameter to prevent CSRF attacks
  const state = Math.random().toString(36).substring(7)

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: `${APP_URL}/api/auth/callback/github`,
    scope: 'read:user user:email',
    state,
    allow_signup: 'true',
  })

  // Store state in cookie for verification in callback
  const response = NextResponse.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`)
  response.cookies.set('github_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 5, // 5 minutes
  })

  return response
} 