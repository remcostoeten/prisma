'use server'

import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { db } from '@/server/db'
import { env } from '@/env'
import { rateLimit, RATE_LIMITS } from '@/server/lib/rate-limit'

export async function logout() {
	try {
		const cookieStore = cookies()
		const token = cookieStore.get('token')?.value

		if (token) {
			try {
				const secretKey = new TextEncoder().encode(env.JWT_SECRET)
				const { payload } = await jwtVerify(token, secretKey)

				if (payload && typeof payload === 'object' && 'sessionToken' in payload) {
					await db.session.delete({
						where: { id: payload.sessionToken as string }
					})
				}
			} catch (error) {
				console.error('Error deleting session:', error)
			}

			cookieStore.delete('token')
		}

		return { success: true }
	} catch (error) {
		console.error('Logout error:', error)
		return { success: false, error: 'Failed to logout' }
	}
}
