'use server'

import { PrismaClient } from '@prisma/client'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

async function createSession(userId: number) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secretKey)

  ;(await cookies()).set('token', token, { httpOnly: true })
}

export async function register(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return { error: 'User already exists' }
    }

    const user = await prisma.user.create({
      data: {
        email,
        password, // In a real application, you should hash the password
      },
    })

    await createSession(user.id)
    return { success: true }
  } catch (error) {
    console.error('Registration error:', error)
    return { error: 'Registration failed' }
  }
}

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || user.password !== password) { // In a real app, you'd compare hashed passwords
      return { error: 'Invalid credentials' }
    }

    await createSession(user.id)
    return { success: true }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Login failed' }
  }
}

export async function googleLogin() {
  const state = uuidv4()
  ;(await cookies()).set('oauth_state', state, { httpOnly: true })
  
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    state,
  })

  redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`)
}

export async function githubLogin() {
  const state = uuidv4()
  ;(await cookies()).set('oauth_state', state, { httpOnly: true })
  
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/github/callback`,
    scope: 'user:email',
    state,
  })

  redirect(`https://github.com/login/oauth/authorize?${params.toString()}`)
}

export async function logout() {
  (await cookies()).delete('token')
  redirect('/login')
}

export async function getUser() {
  const token = (await cookies()).get('token')?.value

  if (!token) {
    return null
  }

  try {
    const verified = await jwtVerify(token, secretKey)
    const user = await prisma.user.findUnique({
      where: { id: verified.payload.userId as number },
      select: { id: true, email: true, name: true, image: true, provider: true },
    })
    return user
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
}
