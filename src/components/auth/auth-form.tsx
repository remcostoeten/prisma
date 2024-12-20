'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/shared/components/ui/input'
import { toast } from 'sonner'
import Spinner from '@/shared/components/effects/spinner'
import { EyeIcon, EyeOffIcon, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { featureFlags } from '@/core/config/feature-flags'
import Link from 'next/link'
import { cn } from '@/shared/lib/utils'
import FancyCheckbox from '@/shared/components/ui/fancy-checkbox/fancy-checkbox'

type AuthFormProps = {
	type: 'login' | 'register'
	action: (data: FormData) => Promise<void>
}

type PasswordRequirement = {
	regex: RegExp
	message: string
}

const passwordRequirements: PasswordRequirement[] = [
	{ regex: /.{8,}/, message: 'At least 8 characters' },
	{ regex: /[A-Z]/, message: 'One uppercase character' },
	{ regex: /[a-z]/, message: 'One lowercase character' },
	{ regex: /[0-9]/, message: 'One number' },
	{ regex: /[^A-Za-z0-9]/, message: 'One special character' },
]

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

const validationVariants = {
	hidden: {
		opacity: 0,
		y: -10,
		scale: 0.95,
		transition: {
			duration: 0.2,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.2,
			ease: 'easeOut'
		}
	}
}

export default function AuthForm({ type, action }: AuthFormProps) {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [focusedInput, setFocusedInput] = useState<string | null>(null)
	const [showRequirements, setShowRequirements] = useState(false)
	const [validRequirements, setValidRequirements] = useState<boolean[]>(
		new Array(passwordRequirements.length).fill(false)
	)
	const [rememberMe, setRememberMe] = useState(false)
	const forgotPasswordEnabled = featureFlags['FORGOT_PASSWORD']

	const schema = type === 'login' ? loginSchema : registerSchema

	const {
		register,
		handleSubmit,
		watch,
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

	const password = watch('password')

	useEffect(() => {
		if (type === 'register') {
			const newValidRequirements = passwordRequirements.map(req =>
				req.regex.test(password || '')
			)
			setValidRequirements(newValidRequirements)
		}
	}, [password, type])

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

	const handleFocus = (field: string) => {
		setFocusedInput(field)
		if (field === 'password' && type === 'register') {
			setShowRequirements(true)
		}
	}

	const handleBlur = () => {
		setFocusedInput(null)
		setTimeout(() => setShowRequirements(false), 200)
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
							onFocus={() => handleFocus('firstName')}
							onBlur={handleBlur}
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
							onFocus={() => handleFocus('lastName')}
							onBlur={handleBlur}
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
					onFocus={() => handleFocus('email')}
					onBlur={handleBlur}
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
				className="relative space-y-2"
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
						onFocus={() => handleFocus('password')}
						onBlur={handleBlur}
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
				<AnimatePresence>
					{type === 'register' && showRequirements && (
						<motion.div 
							variants={validationVariants}
							initial="hidden"
							animate="visible"
							exit="hidden"
							className="absolute left-0 right-0 top-[calc(100%+4px)] bg-[#1f1f1f] border border-[#2f2f2f] rounded-md p-2 shadow-lg z-10"
						>
							<div className="text-sm font-medium mb-2 text-neutral-300">Password requirements:</div>
							<div className="space-y-1">
								{passwordRequirements.map((req, index) => (
									<motion.div
										key={req.message}
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.05 }}
										className={cn(
											"flex items-center gap-2 text-sm transition-colors duration-200",
											validRequirements[index] ? "text-emerald-500" : "text-neutral-400"
										)}
									>
										<div className="w-4 h-4 flex items-center justify-center">
											<AnimatePresence mode="wait">
												{validRequirements[index] ? (
													<motion.div
														key="check"
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														exit={{ scale: 0 }}
													>
														✓
													</motion.div>
												) : (
													<motion.div
														key="alert"
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														exit={{ scale: 0 }}
													>
														<AlertCircle className="w-3 h-3" />
													</motion.div>
												)}
											</AnimatePresence>
										</div>
										{req.message}
									</motion.div>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
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
							onFocus={() => handleFocus('confirmPassword')}
							onBlur={handleBlur}
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

			{type === 'login' && (
				<div className="flex items-center justify-between text-sm">
					<label className="group flex items-center gap-2 cursor-pointer">
						<FancyCheckbox
							checked={rememberMe}
							onChange={(checked) => {
								setRememberMe(checked)
								const rememberMeField = register('rememberMe').onChange
								rememberMeField({ target: { value: checked } })
							}}
						/>
						<span className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
							Remember me
						</span>
					</label>

					{forgotPasswordEnabled && (
						<Link
							href="/forgot-password"
							className="text-neutral-400 hover:text-neutral-300 transition-colors"
						>
							Forgot password?
						</Link>
					)}
				</div>
			)}

			<motion.button
				type="submit"
				className="relative w-full h-10 bg-emerald-500 text-white rounded font-medium overflow-hidden"
				disabled={isLoading}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
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
