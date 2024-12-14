'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { register } from '@/server/mutations/auth/user'
import { toast } from 'sonner'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { useUser } from '@/contexts/user-context'
import Spinner from '@/shared/components/effects/spinner'
import PasswordStrength from '@/shared/components/password-strength'
import { passwordStrengthConfig } from '@/core/config/settings'

function RegisterForm() {
	const [loading, setLoading] = useState(false)
	const [password, setPassword] = useState('')
	const router = useRouter()
	const { setUser } = useUser()

	async function handleSubmit(formData: FormData) {
		// Check password strength before submitting
		const score = calculatePasswordScore(password)
		if (score < passwordStrengthConfig.minStrengthRequired) {
			toast.error('Password is not strong enough')
			return
		}

		setLoading(true)
		try {
			const result = await register(formData)
			if (result.error) {
				toast.error(result.error)
			} else if (result.success && result.user) {
				setUser(result.user)
				toast.success('Registration successful')
				router.push('/dashboard')
			}
		} catch (error) {
			console.error('Registration error:', error)
			toast.error('Registration failed')
		} finally {
			setLoading(false)
		}
	}

	function calculatePasswordScore(pwd: string): number {
		let score = 0
		if (pwd.length >= passwordStrengthConfig.minLength) score++
		if (/[A-Z]/.test(pwd) && passwordStrengthConfig.requireUppercase)
			score++
		if (/[a-z]/.test(pwd) && passwordStrengthConfig.requireLowercase)
			score++
		if (/\d/.test(pwd) && passwordStrengthConfig.requireNumbers) score++
		if (
			/[^A-Za-z0-9]/.test(pwd) &&
			passwordStrengthConfig.requireSpecialChars
		)
			score++
		return score
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background">
			<div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-8 shadow-lg">
				<div className="text-center">
					<h1 className="text-2xl font-bold tracking-tight text-foreground">
						Create an Account
					</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						Sign up to get started
					</p>
				</div>

				<form action={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="firstName">First Name</Label>
							<Input
								id="firstName"
								name="firstName"
								type="text"
								required
								className="mt-1"
								placeholder="John"
							/>
						</div>
						<div>
							<Label htmlFor="lastName">Last Name</Label>
							<Input
								id="lastName"
								name="lastName"
								type="text"
								required
								className="mt-1"
								placeholder="Doe"
							/>
						</div>
					</div>
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							required
							className="mt-1"
							placeholder="john.doe@example.com"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							required
							className="mt-1"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{password.length > 0 && (
							<PasswordStrength
								password={password}
								className={`mt-2 trans-in ${password.length > 0 ? 'opacity-100 trans-in' : 'opacity-0'}`}
							/>
						)}
					</div>
					<div>
						<Label htmlFor="confirmPassword">
							Confirm Password
						</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							required
							className="mt-1"
						/>
					</div>
					<Button type="submit" disabled={loading} className="w-full">
						{loading ? 'Creating account...' : 'Create account'}
					</Button>
				</form>
				<div className="text-center text-sm text-muted-foreground">
					Already have an account?{' '}
					<Link
						href="/login"
						className="font-semibold text-primary hover:text-primary/80"
					>
						Sign in
					</Link>
				</div>
			</div>
		</div>
	)
}

export default function Register() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen items-center justify-center">
					<Spinner size="lg" />
				</div>
			}
		>
			<RegisterForm />
		</Suspense>
	)
}
