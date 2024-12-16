'use server'

import { cookies } from 'next/headers'
import { SignJWT } from 'jose'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import { AUTH_COOKIE_NAME, secretKey } from '@/core/config/auth'
import { db } from '@/server/db'
import { createSession } from '../session'
import type { AuthResponse, User } from './types'

export async function login(formData: FormData): Promise<AuthResponse> {
	const email = formData.get('email') as string
	const password = formData.get('password') as string

	if (!email || !password) {
		return { success: false, error: 'Email and password are required' }
	}

	try {
		const user = await db.user.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				password: true,
				name: true,
				image: true,
				provider: true,
				emailVerified: true,
				firstName: true,
				lastName: true
			}
		})

		if (!user || !user.password) {
			return { success: false, error: 'Invalid credentials' }
		}

		const isValidPassword = await bcrypt.compare(password, user.password)
		if (!isValidPassword) {
			return { success: false, error: 'Invalid credentials' }
		}

		await createSession(user.id).catch(console.error)

		return {
			success: true,
			user: {
				...user,
				password: undefined,
				image: user.image ?? null,
				provider: user.provider ?? 'credentials',
				emailVerified: user.emailVerified ?? null
			}
		}
	} catch (error) {
		console.error('Login error:', error)
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Login failed'
		}
	}
}
