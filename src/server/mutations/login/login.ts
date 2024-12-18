'use server'

import { cookies } from 'next/headers'
import { SignJWT } from 'jose'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import prisma from '@/server/db'
import { AUTH_CONFIG } from '@/core/config/auth'
import type { LoginResponse, LoginError } from './types'
import type { User } from '../auth/user/types'

type UserWithPassword = User & {
	password: string | null
}

export async function login(formData: FormData): Promise<LoginResponse> {
	try {
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		if (!email || !password) {
			return { success: false, error: 'Email and password are required' }
		}

		const user = await prisma.user.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				name: true,
				image: true,
				provider: true,
				emailVerified: true,
				password: true
			}
		}) as UserWithPassword | null

		if (!user || !user.password) {
			return { success: false, error: 'Invalid credentials' }
		}

		const isValid = await bcrypt.compare(password, user.password)

		if (!isValid) {
			return { success: false, error: 'Invalid credentials' }
		}

		// Create session
		const sessionId = uuidv4()
		const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

		await prisma.session.create({
			data: {
				id: sessionId,
				userId: user.id,
				expiresAt
			}
		})

		// Create JWT
		const secretKey = new TextEncoder().encode(
			process.env.JWT_SECRET || 'your-secret-key'
		)
		const token = await new SignJWT({
			userId: user.id,
			sessionId,
			type: 'session'
		})
			.setProtectedHeader({ alg: 'HS256' })
			.setExpirationTime(expiresAt.getTime() / 1000)
			.sign(secretKey)

		const cookieStore = await cookies()
		cookieStore.set(AUTH_CONFIG.cookieName, token, {
			httpOnly: true,
			expires: expiresAt,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax'
		})

		// Return user without password
		const { password: _, ...userWithoutPassword } = user

		return {
			success: true,
			user: userWithoutPassword
		}
	} catch (error) {
		console.error('Login error:', error)
		const loginError: LoginError = {
			message: 'An error occurred during login',
			code: 'LOGIN_ERROR',
			status: 500
		}
		return { success: false, error: loginError.message }
	}
}
