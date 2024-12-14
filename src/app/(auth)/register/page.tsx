'use client'

import { AuthWrapper, AuthForm } from '@/components/auth'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/shared/hooks/use-auth'
import { toast } from 'sonner'
import { registerAction, loginAction } from '../actions'
import { useUser } from '@/contexts/user-context'

export default function RegisterPage() {
	const router = useRouter()
	const { setUser: setAuthUser } = useAuth()
	const { refreshUser } = useUser()

	const handleRegistration = async (formData: FormData): Promise<void> => {
		try {
			// First, register the user
			const registerResponse = await registerAction(formData)

			if (!registerResponse?.success || !registerResponse?.user) {
				toast.error(registerResponse?.error || 'Registration failed')
				return
			}

			// Create a new FormData object for login
			const loginFormData = new FormData()
			loginFormData.append('email', formData.get('email') as string)
			loginFormData.append('password', formData.get('password') as string)

			// Attempt auto-login
			const loginResponse = await loginAction(loginFormData)

			if (!loginResponse?.success || !loginResponse?.user) {
				toast.error(
					'Registration successful but auto-login failed. Please try logging in manually.'
				)
				router.replace('/login')
				return
			}

			// Update auth states
			setAuthUser(loginResponse.user)
			await refreshUser()

			toast.success('Successfully registered and logged in')
			router.replace('/dashboard')
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: 'An unexpected error occurred during registration'

			toast.error(errorMessage)
			console.error('Registration error:', error)
		}
	}

	return (
		<AuthWrapper type="register">
			<AuthForm type="register" action={handleRegistration} />
		</AuthWrapper>
	)
}
