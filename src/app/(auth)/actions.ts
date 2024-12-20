'use server'

import { prisma } from '@/lib/prisma'
import { hash, compare } from 'bcryptjs'
import type { AuthResponse } from '@/core/types/auth'

export async function registerAction(formData: FormData): Promise<AuthResponse> {
	try {
		const email = formData.get('email')?.toString()
		const password = formData.get('password')?.toString()
		const firstName = formData.get('firstName')?.toString()
		const lastName = formData.get('lastName')?.toString()

		if (!email || !password || !firstName || !lastName) {
			return {
				success: false,
				error: 'All fields are required'
			}
		}

		const existingUser = await prisma.user.findUnique({
			where: { email }
		})

		if (existingUser) {
			return {
				success: false,
				error: 'User with this email already exists'
			}
		}

		const hashedPassword = await hash(password, 12)

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				firstName,
				lastName
			}
		})

		return {
			success: true,
			user: {
				id: user.id.toString(),
				email: user.email,
				firstName: user.firstName || '',
				lastName: user.lastName || ''
			}
		}
	} catch (error) {
		console.error('Registration error:', error)
		return {
			success: false,
			error: 'Failed to create account'
		}
	}
}

export async function loginAction(formData: FormData): Promise<AuthResponse> {
	try {
		const email = formData.get('email')?.toString()
		const password = formData.get('password')?.toString()

		if (!email || !password) {
			return {
				success: false,
				error: 'Email and password are required'
			}
		}

		const user = await prisma.user.findUnique({
			where: { email }
		})

		if (!user || !user.password) {
			return {
				success: false,
				error: 'Invalid email or password'
			}
		}

		const isValidPassword = await compare(password, user.password)

		if (!isValidPassword) {
			return {
				success: false,
				error: 'Invalid email or password'
			}
		}

		return {
			success: true,
			user: {
				id: user.id.toString(),
				email: user.email,
				firstName: user.firstName || '',
				lastName: user.lastName || ''
			}
		}
	} catch (error) {
		console.error('Login error:', error)
		return {
			success: false,
			error: 'Failed to log in'
		}
	}
} 
