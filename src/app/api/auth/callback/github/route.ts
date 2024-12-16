import { NextRequest } from 'next/server'
import { db } from '@/server/db'
import { AuthService } from '@/server/services/auth.service'

const authService = new AuthService()

export async function GET(request: NextRequest) {
	return authService.handleGitHubCallback(request)
}
