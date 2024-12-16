export const AUTH_COOKIE_NAME = 'token'

// Create a secure secret key for JWT signing
export const secretKey = new TextEncoder().encode(
	process.env.JWT_SECRET || 'your-secret-key'
)

export const AUTH_CONFIG = {
	cookieName: 'token',
	session: {
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		updateAge: 24 * 60 * 60 * 1000, // 24 hours
	},
	pages: {
		signIn: '/login',
		signOut: '/logout',
		error: '/auth/error',
		verifyRequest: '/auth/verify-request',
		newUser: '/auth/new-user'
	},
	providers: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}
	}
} as const

export const OAUTH_CONFIG = {
	github: {
		authorizationUrl: 'https://github.com/login/oauth/authorize',
		tokenUrl: 'https://github.com/login/oauth/access_token',
		userInfoUrl: 'https://api.github.com/user',
		userEmailsUrl: 'https://api.github.com/user/emails',
		scope: 'read:user user:email',
	},
	google: {
		authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
		tokenUrl: 'https://oauth2.googleapis.com/token',
		userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
		scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
	}
} as const
