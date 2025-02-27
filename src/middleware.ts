import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { AUTH_CONFIG } from '@/core/config/auth'

const PUBLIC_PATHS = ['/login', '/register', '/api/auth']
const AUTH_PATHS = ['/dashboard']

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Allow public paths
	if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
		// If user is already authenticated and trying to access auth pages, redirect to dashboard
		const token = request.cookies.get(AUTH_CONFIG.cookieName)?.value
		if (token && (pathname === '/login' || pathname === '/register')) {
			try {
				await jwtVerify(
					token,
					new TextEncoder().encode(process.env.JWT_SECRET)
				)
				return NextResponse.redirect(new URL('/dashboard', request.url))
			} catch {
				// If token is invalid, let them proceed to login/register
				return NextResponse.next()
			}
		}
		return NextResponse.next()
	}

	// Check for auth token
	const token = request.cookies.get(AUTH_CONFIG.cookieName)?.value

	// If accessing auth-required path without token, redirect to login
	if (AUTH_PATHS.some((path) => pathname.startsWith(path)) && !token) {
		const loginUrl = new URL('/login', request.url)
		loginUrl.searchParams.set('from', pathname)
		return NextResponse.redirect(loginUrl)
	}

	// If token exists, verify it
	if (token) {
		try {
			const verified = await jwtVerify(
				token,
				new TextEncoder().encode(process.env.JWT_SECRET)
			)

			// Add user info to headers for server components
			const response = NextResponse.next()
			response.headers.set('x-user-id', verified.payload.userId as string)
			response.headers.set(
				'x-session-id',
				verified.payload.sessionId as string
			)
			return response
		} catch (error) {
			// If token is invalid, clear it and redirect to login
			const response = NextResponse.redirect(
				new URL('/login', request.url)
			)
			response.cookies.delete(AUTH_CONFIG.cookieName)
			return response
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		'/((?!_next/static|_next/image|favicon.ico|public/).*)'
	]
}
