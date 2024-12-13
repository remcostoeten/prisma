import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

// Add any routes that should be protected here
const protectedRoutes = ['/dashboard']
// Add any routes that should only be accessible to non-authenticated users
const authRoutes = ['/login', '/register']

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Verify authentication
  const isAuthenticated = token ? await verifyToken(token) : false

  // Handle protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const url = new URL('/login', request.url)
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
  }

  // Handle auth routes (login/register)
  if (authRoutes.includes(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

async function verifyToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, secretKey)
    return !!(payload && typeof payload === 'object' && 'userId' in payload)
  } catch {
    return false
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}