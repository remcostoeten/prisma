'use client'

import { AuthWrapper, AuthForm } from '@/components/auth'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/shared/hooks/use-auth'
import type { AuthResponse } from '@/shared/hooks/use-auth'
import { toast } from 'sonner'
import { loginAction } from '../actions'
import { useUser } from '@/contexts/user-context'

export default function LoginPage() {
	const router = useRouter()
	const { setUser: setAuthUser } = useAuth()
	const { refreshUser } = useUser()

	const handleLogin = async (formData: FormData) => {
		try {
			const response: AuthResponse = await loginAction(formData)

			if (!response.success || !response.user) {
				toast.error(response.error || 'Authentication failed')
				return
			}

			// Update both auth states
			setAuthUser(response.user)
			await refreshUser()

			toast.success('Successfully logged in')

			// Use replace instead of push to prevent back navigation to login
			router.replace('/dashboard')
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: 'An unexpected error occurred'

			toast.error(errorMessage)
			console.error('Login failed:', error)
		}
	}

	return (
		<AuthWrapper type="login">
			<AuthForm type="login" action={handleLogin} />
		</AuthWrapper>
	)
}
