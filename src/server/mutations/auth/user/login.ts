'use server'

import { cookies } from 'next/headers'
import { SignJWT } from 'jose'
import bcrypt from 'bcryptjs'
import { db } from '@/server/db'
import { AUTH_CONFIG } from '@/core/config/auth'
import type { User } from '@/core/types/user'

type LoginResponse = {
	success: boolean
	error?: string
	user?: User
}

export default async function login(formData: FormData): Promise<LoginResponse> {
	const email = formData.get('email')
	const password = formData.get('password')

	if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
		return { success: false, error: 'Email and password are required' }
	}

	try {
		const user = await db.user.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				password: true,
				firstName: true,
				lastName: true,
				name: true,
				image: true,
				provider: true,
				emailVerified: true
			}
		})

		if (!user) {
			return { success: false, error: 'Invalid credentials' }
		}

		if (!user.password) {
			return { success: false, error: 'Account requires password' }
		}

		const isValidPassword = await bcrypt.compare(password, user.password)
		if (!isValidPassword) {
			return { success: false, error: 'Invalid credentials' }
		}

		const expiresAt = new Date(Date.now() + AUTH_CONFIG.session.maxAge)
		const session = await db.session.create({
			data: {
				userId: user.id,
				expiresAt
			}
		})

		const token = await new SignJWT({
			userId: user.id,
			sessionToken: session.id,
			type: 'session'
		})
			.setProtectedHeader({ alg: 'HS256' })
			.setExpirationTime(expiresAt.getTime() / 1000)
			.setIssuedAt()
			.sign(new TextEncoder().encode(process.env.JWT_SECRET))

		const cookieStore = await cookies()
		cookieStore.set(AUTH_CONFIG.cookieName, token, {
			httpOnly: true,
			expires: expiresAt,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/'
		})

		return {
			success: true,
			user: {
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				name: user.name,
				image: user.image,
				provider: user.provider,
				emailVerified: user.emailVerified
			}
		}
	} catch (error) {
		console.error('Login error:', error)
		return {
			success: false,
			error: error instanceof Error ? error.message : 'An error occurred during login'
		}
	}
}
