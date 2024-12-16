'use client'

import { AuthForm } from '@/components/auth'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/shared/hooks/use-auth'
import { toast } from 'sonner'
import { loginAction } from '../actions'
import { useUser } from '@/contexts/user-context'
import AuthLayout from '@/components/auth/auth-layout'
import Link from 'next/link'

export default function LoginPage() {
	const router = useRouter()
	const { setUser: setAuthUser } = useAuth()
	const { refreshUser } = useUser()

	const handleLogin = async (formData: FormData): Promise<void> => {
		const toastId = toast.loading('Logging in...')

		try {
			const response = await loginAction(formData)
			console.log('Login response:', response)

			if (!response?.success || !response?.user) {
				toast.error(response?.error || 'Authentication failed', { id: toastId })
				return
			}

			setAuthUser(response.user)
			await refreshUser()

			toast.success('Successfully logged in', { id: toastId })
			router.replace('/dashboard')
		} catch (error) {
			console.error('Login error:', error)
			const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
			toast.error(errorMessage, { id: toastId })
		}
	}

	return (
		<AuthLayout
			title="Welcome back"
			subtitle={
				<>
					Don&apos;t have an account?{' '}
					<Link
						href="/register"
						className="underline underline-offset-4 hover:text-primary"
					>
						Sign up
					</Link>
				</>
			}
		>
			<AuthForm type="login" action={handleLogin} />
		</AuthLayout>
	)
}
