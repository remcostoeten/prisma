'use server'

import bcrypt from 'bcryptjs'
import prisma from '@/server/db'
import { createSession } from '../session'
import type { AuthResponse } from './types'

export async function register(formData: FormData): Promise<AuthResponse> {
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
				name: `${firstName} ${lastName}`
			}
		})

		await createSession(user.id)
		return { success: true, user }
	} catch (error) {
		console.error('Registration error:', error)
		return { error: 'Registration failed' }
	}
}
