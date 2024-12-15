'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/shared/components/ui/input'
import { toast } from 'sonner'
import Spinner from '@/shared/components/effects/spinner'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { featureFlags } from '@/core/config/feature-flags'
import Link from 'next/link'

type AuthFormProps = {
	type: 'login' | 'register'
	action: (data: FormData) => Promise<void>
}

const baseSchema = {
	email: z.string().email('Please enter a valid email'),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number')
		.regex(
			/[^A-Za-z0-9]/,
			'Password must contain at least one special character'
		)
}

const loginSchema = z.object({
	...baseSchema,
	rememberMe: z.boolean().optional()
})

const registerSchema = z
	.object({
		...baseSchema,
		firstName: z
			.string()
			.min(2, 'First name must be at least 2 characters'),
		lastName: z.string().min(2, 'Last name must be at least 2 characters'),
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	})

const inputVariants = {
	focus: {
		boxShadow: '0 0 0 2px rgba(62, 207, 142, 0.1)',
		borderColor: '#3ecf8e',
		transition: { duration: 0.2 }
	},
	blur: {
		boxShadow: '0 0 0 0px rgba(62, 207, 142, 0)',
		borderColor: '#2f2f2f',
		transition: { duration: 0.2 }
	},
	error: {
		boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.1)',
		borderColor: '#ef4444',
		transition: { duration: 0.2 }
	}
}

export default function AuthForm({ type, action }: AuthFormProps) {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [focusedInput, setFocusedInput] = useState<string | null>(null)
	const forgotPasswordEnabled = featureFlags['FORGOT_PASSWORD']

	const schema = type === 'login' ? loginSchema : registerSchema

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues:
			type === 'login'
				? { email: '', password: '', rememberMe: false }
				: {
						email: '',
						password: '',
						firstName: '',
						lastName: '',
						confirmPassword: ''
					}
	})

	const handleFormSubmit = async (data: z.infer<typeof schema>) => {
		try {
			setIsLoading(true)
			const formData = new FormData()
			Object.entries(data).forEach(([key, value]) => {
				if (value !== undefined) {
					formData.append(key, value?.toString() ?? '')
				}
			})
			await action(formData)
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'Something went wrong'
			)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
			{type === 'register' && (
				<div className="grid grid-cols-2 gap-4">
					<motion.div
						animate={
							errors.firstName
								? 'error'
								: focusedInput === 'firstName'
									? 'focus'
									: 'blur'
						}
						variants={inputVariants}
						className="space-y-2"
					>
						<Input
							{...register('firstName')}
							placeholder="First name"
							autoComplete="given-name"
							onFocus={() => setFocusedInput('firstName')}
							onBlur={() => setFocusedInput(null)}
							className="h-10 bg-[#1f1f1f] border-inherit transition-all placeholder:text-neutral-500 focus:bg-[#2a2a2a]"
							error={errors.firstName?.message}
						/>
					</motion.div>
					<motion.div
						animate={
							errors.lastName
								? 'error'
								: focusedInput === 'lastName'
									? 'focus'
									: 'blur'
						}
						variants={inputVariants}
						className="space-y-2"
					>
						<Input
							{...register('lastName')}
							placeholder="Last name"
							autoComplete="family-name"
							onFocus={() => setFocusedInput('lastName')}
							onBlur={() => setFocusedInput(null)}
							className="h-10 bg-[#1f1f1f] border-inherit transition-all placeholder:text-neutral-500 focus:bg-[#2a2a2a]"
							error={errors.lastName?.message}
						/>
					</motion.div>
				</div>
			)}

			<motion.div
				animate={
					errors.email
						? 'error'
						: focusedInput === 'email'
							? 'focus'
							: 'blur'
				}
				variants={inputVariants}
				className="space-y-2"
			>
				<Input
					{...register('email')}
					type="email"
					placeholder="Email"
					autoComplete="email"
					onFocus={() => setFocusedInput('email')}
					onBlur={() => setFocusedInput(null)}
					className="h-10 bg-[#1f1f1f] border-inherit transition-all placeholder:text-neutral-500 focus:bg-[#2a2a2a]"
					error={errors.email?.message}
				/>
			</motion.div>

			<motion.div
				animate={
					errors.password
						? 'error'
						: focusedInput === 'password'
							? 'focus'
							: 'blur'
				}
				variants={inputVariants}
				className="space-y-2"
			>
				<div className="relative group">
					<Input
						{...register('password')}
						type={showPassword ? 'text' : 'password'}
						placeholder="Password"
						autoComplete={
							type === 'login'
								? 'current-password'
								: 'new-password'
						}
						onFocus={() => setFocusedInput('password')}
						onBlur={() => setFocusedInput(null)}
						className="h-10 bg-[#1f1f1f] border-inherit transition-all placeholder:text-neutral-500 focus:bg-[#2a2a2a] pr-10"
						error={errors.password?.message}
					/>
					<motion.button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-300 focus:outline-none"
						whileTap={{ opacity: 0.5 }}
					>
						<AnimatePresence mode="wait" initial={false}>
							{showPassword ? (
								<motion.div
									key="eye-off"
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
									transition={{ duration: 0.15 }}
								>
									<EyeOffIcon className="h-4 w-4" />
								</motion.div>
							) : (
								<motion.div
									key="eye"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.15 }}
								>
									<EyeIcon className="h-4 w-4" />
								</motion.div>
							)}
						</AnimatePresence>
					</motion.button>
				</div>
			</motion.div>

			{type === 'register' && (
				<motion.div
					animate={
						errors.confirmPassword
							? 'error'
							: focusedInput === 'confirmPassword'
								? 'focus'
								: 'blur'
					}
					variants={inputVariants}
					className="space-y-2"
				>
					<div className="relative group">
						<Input
							{...register('confirmPassword')}
							type={showConfirmPassword ? 'text' : 'password'}
							placeholder="Confirm Password"
							autoComplete="new-password"
							onFocus={() => setFocusedInput('confirmPassword')}
							onBlur={() => setFocusedInput(null)}
							className="h-10 bg-[#1f1f1f] border-inherit transition-all placeholder:text-neutral-500 focus:bg-[#2a2a2a] pr-10"
							error={errors.confirmPassword?.message}
						/>
						<motion.button
							type="button"
							onClick={() =>
								setShowConfirmPassword(!showConfirmPassword)
							}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-300 focus:outline-none"
							whileTap={{ opacity: 0.5 }}
						>
							<AnimatePresence mode="wait" initial={false}>
								{showConfirmPassword ? (
									<motion.div
										key="eye-off"
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
										transition={{ duration: 0.15 }}
									>
										<EyeOffIcon className="h-4 w-4" />
									</motion.div>
								) : (
									<motion.div
										key="eye"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.15 }}
									>
										<EyeIcon className="h-4 w-4" />
									</motion.div>
								)}
							</AnimatePresence>
						</motion.button>
					</div>
				</motion.div>
			)}

			{forgotPasswordEnabled && (
				<div className="text-right mt-4">
					<Link
						href="/forgot-password"
						className="text-blue-500 hover:text-blue-700"
					>
						Forgot Password?
					</Link>
				</div>
			)}

			<motion.button
				type="submit"
				className="relative w-full h-10 bg-emerald-500 text-white rounded font-medium overflow-hidden"
				disabled={isLoading}
				whileHover="hover"
				initial="initial"
				animate="animate"
			>
				<motion.div
					className="absolute inset-0 bg-emerald-600"
					initial={{ scaleX: 0 }}
					animate={{ scaleX: isLoading ? 1 : 0 }}
					transition={{ duration: 0.5 }}
					style={{ originX: 0 }}
				/>
				<motion.div className="relative flex items-center justify-center gap-2">
					{isLoading && <Spinner className="text-white" />}
					<span>
						{type === 'login' ? 'Sign In' : 'Create Account'}
					</span>
				</motion.div>
			</motion.button>
		</form>
	)
}
