'use server'

import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { db } from '@/server/db'
import { AUTH_CONFIG } from '@/core/config/auth'
import type { UserResponse } from './types'

export async function getUser(): Promise<UserResponse> {
	const token = cookies().get(AUTH_CONFIG.cookieName)?.value

	if (!token) return null

	try {
		const verified = await jwtVerify(
			token,
			new TextEncoder().encode(process.env.JWT_SECRET)
		)

		if (
			!verified.payload ||
			typeof verified.payload !== 'object' ||
			!('userId' in verified.payload) ||
			!('sessionId' in verified.payload)
		) {
			throw new Error('Invalid token payload')
		}

		// Verify session exists and is not expired
		const session = await db.session.findUnique({
			where: {
				id: verified.payload.sessionId as string,
				userId: verified.payload.userId as number,
				expiresAt: { gt: new Date() }
			}
		})

		if (!session) {
			throw new Error('Session not found or expired')
		}

		// Get user data
		const user = await db.user.findUnique({
			where: { id: verified.payload.userId as number },
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				name: true,
				image: true,
				provider: true,
				emailVerified: true
			}
		})

		if (!user) {
			throw new Error('User not found')
		}

		return user
	} catch (error) {
		console.error('Get user error:', error)
		// Delete the invalid token
		cookies().delete(AUTH_CONFIG.cookieName)
		return null
	}
}
