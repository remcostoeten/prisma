import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { PrismaClient } from '@prisma/client'
import { SignJWT } from 'jose'

const prisma = new PrismaClient()
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

// Replace the 'any' type with a proper type for the GitHub profile
type GitHubProfile = {
  id: number
  email: string | null
  name: string | null
  avatar_url: string | null
  login: string
}

// Add type for GitHub email response
type GitHubEmail = {
  email: string
  primary: boolean
  verified: boolean
  visibility: string | null
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  // Verify state
  const storedState = (await cookies()).get('oauth_state')?.value
  if (state !== storedState) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=Invalid state`)
  }

  try {
    // Exchange code for token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const tokenData = await tokenResponse.json()

    // Get user info
    const userResponse = await fetch('https://api.github.com/user', {
      headers: { 
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: 'application/json',
      },
    })

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user info')
    }

    const userData = await userResponse.json() as GitHubProfile

    // Get user email
    const emailResponse = await fetch('https://api.github.com/user/emails', {
      headers: { 
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: 'application/json',
      },
    })

    if (!emailResponse.ok) {
      throw new Error('Failed to fetch user email')
    }

    const emailData = await emailResponse.json() as GitHubEmail[]
    const primaryEmail = emailData.find((email) => email.primary)?.email

    if (!primaryEmail) {
      throw new Error('No primary email found')
    }

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email: primaryEmail } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: primaryEmail,
          name: userData.name || userData.login,
          image: userData.avatar_url,
          provider: 'github',
          password: null,
        },
      })
    }

    // Create JWT
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(secretKey)

    // Set cookie and redirect
    ;(await
      // Set cookie and redirect
      cookies()).set('token', token, { httpOnly: true })
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`)
  } catch (error) {
    console.error('GitHub auth error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=Authentication failed`)
  }
}

