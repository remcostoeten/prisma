'use server'

import { v4 as uuidv4 } from 'uuid'
import { db } from '@/server/db'
import { AUTH_CONFIG } from '@/core/config/auth'
import type { SessionResponse } from './user/types'

export async function createSession(userId: number): Promise<SessionResponse> {
	try {
		const sessionToken = uuidv4()
		const expiresAt = new Date(Date.now() + AUTH_CONFIG.session.maxAge)

		const session = await db.session.create({
			data: {
				id: sessionToken,
				userId,
				expiresAt
			}
		})

		return {
			success: true,
			sessionToken: session.id
		}
	} catch (error) {
		console.error('Session creation error:', error)
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to create session'
		}
	}
}

export async function deleteSession(sessionToken: string): Promise<SessionResponse> {
	try {
		await db.session.delete({
			where: { id: sessionToken }
		})

		return { success: true }
	} catch (error) {
		console.error('Session deletion error:', error)
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to delete session'
		}
	}
}
