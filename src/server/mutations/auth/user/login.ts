'use server'

import bcrypt from 'bcryptjs'
import prisma from '@/server/db'
import { createSession } from '../session'
import type { AuthResponse } from './types'

export async function login(formData: FormData): Promise<AuthResponse> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user?.password || !(await bcrypt.compare(password, user.password))) {
      return { error: 'Invalid credentials' }
    }

    await createSession(user.id)
    return { success: true, user }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Login failed' }
  }
} 