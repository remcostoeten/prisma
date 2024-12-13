'use server'

import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import prisma from '@/server/db'
import type { UserResponse } from './types'

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

export async function getUser(): Promise<UserResponse | null> {
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