'use server'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import prisma from '@/server/db'

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

async function createSession(userId: number): Promise<void> {
  const sessionToken = uuidv4()
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  await prisma.session.create({
    data: {
      id: sessionToken,
      userId,
      expiresAt,
    },
  })

  const payload: Auth.JWTPayload = {
    userId,
    sessionToken,
    type: 'session'
  }

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresAt.getTime() / 1000)
    .sign(secretKey)

  ;(await cookies()).set('token', token, { httpOnly: true, expires: expiresAt })
}

export async function register(formData: FormData): Promise<Auth.AuthResponse> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  if (!email || !password || !firstName || !lastName) {
    return { error: 'All fields are required' }
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return { error: 'User already exists' }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
      },
    })

    await createSession(user.id)
    return { success: true, user }
  } catch (error) {
    console.error('Registration error:', error)
    return { error: 'Registration failed' }
  }
}

export async function login(formData: FormData): Promise<Auth.AuthResponse> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { error: 'Invalid credentials' }
    }

    await createSession(user.id)
    return { success: true, user }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Login failed' }
  }
}

export async function logout(): Promise<void> {
  const token = (await cookies()).get('token')?.value

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secretKey)
      if (payload && typeof payload === 'object' && 'sessionToken' in payload) {
        await prisma.session.delete({ where: { id: payload.sessionToken as string } })
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  ;(await cookies()).delete('token')
  redirect('/login')
}

export async function getUser(): Promise<Partial<Auth.User> | null> {
  const token = (await cookies()).get('token')?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, secretKey)
    if (payload && typeof payload === 'object' && 'userId' in payload) {
      return await prisma.user.findUnique({
        where: { id: payload.userId as number },
        select: { id: true, email: true, firstName: true, lastName: true, name: true, image: true, provider: true },
      })
    }
    return null
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
}

export async function getSession(): Promise<Auth.Session | null> {
  const token = (await cookies()).get('token')?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, secretKey)
    if (payload && typeof payload === 'object' && 'sessionToken' in payload) {
      return await prisma.session.findUnique({ where: { id: payload.sessionToken as string } })
    }
    return null
  } catch (error) {
    console.error('Get session error:', error)
    return null
  }
}