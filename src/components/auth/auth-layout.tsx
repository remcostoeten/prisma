'use client'

/**
 * @author Remco Stoeten
 * @description Authentication layout component with social login options
 */

import { Logo } from '@/components/theme/logo'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import AuthQuote from './quote'
import { siteConfig } from '@/core/config/site'
import FancyCheckbox from '@/shared/components/ui/fancy-checkbox/fancy-checkbox'
import { useRememberMe } from '@/shared/hooks/use-remember-me'
import { isFeatureEnabled } from '@/core/config/feature-flags'
import { Github } from 'lucide-react'
import { toast } from 'sonner'
import { AUTH_CLASSES, AUTH_ANIMATIONS } from '@/core/constants/auth'

type AuthLayoutProps = {
	children: ReactNode
	title: string
	subtitle: ReactNode
}

const SocialButton = ({
	icon,
	children,
	...props
}: {
	icon: ReactNode
	children: ReactNode
} & Omit<React.ComponentProps<typeof motion.button>, 'ref'>) => (
	<motion.button
		className={AUTH_CLASSES.social.button}
		variants={AUTH_ANIMATIONS.buttonHover}
		initial="rest"
		animate="rest"
		{...props}
	>
		<div className={AUTH_CLASSES.social.icon}>{icon}</div>
		<span className={AUTH_CLASSES.social.text}>{children}</span>
	</motion.button>
)

export default function AuthLayout({
	children,
	title,
	subtitle
}: AuthLayoutProps) {
	const { rememberMe, setRememberMe } = useRememberMe()

	const handleGithubLogin = async () => {
		try {
			window.location.href = '/api/auth/github'
		} catch (error) {
			console.error('GitHub login failed:', error)
			toast.error('GitHub login failed')
		}
	}

	return (
		<div className="flex min-h-screen flex-col bg-[#1C1C1C] text-white">
			<div className="flex flex-1">
				<main className="flex w-full flex-col items-center justify-center px-5 lg:w-1/2">
					<motion.div
						className="w-full max-w-[400px] space-y-6"
						variants={AUTH_ANIMATIONS.container}
						initial="hidden"
						animate="show"
					>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Logo className="h-6" />
								<motion.h1
									variants={AUTH_ANIMATIONS.fadeInUp}
									className="text-2xl font-medium font-geist-mono"
								>
									{title}
								</motion.h1>
							</div>
							<motion.p
								variants={AUTH_ANIMATIONS.fadeInUp}
								className="text-sm text-neutral-400 font-inter"
							>
								{subtitle}
							</motion.p>
						</div>

						<motion.div
							variants={AUTH_ANIMATIONS.fadeInUp}
							className="space-y-4"
						>
							{isFeatureEnabled('SOCIAL_LOGIN') && (
								<>
									<SocialButton
										icon={
											<Github className="mr-2 h-4 w-4" />
										}
										onClick={handleGithubLogin}
									>
										Continue with GitHub
									</SocialButton>

									<SocialButton
										icon={
											<svg viewBox="0 0 24 24">
												<path
													fill="#4285F4"
													d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
												/>
												<path
													fill="#34A853"
													d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
												/>
												<path
													fill="#FBBC05"
													d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
												/>
												<path
													fill="#EA4335"
													d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
												/>
											</svg>
										}
									>
										Continue with Google
									</SocialButton>

									<div className="relative">
										<div className="absolute inset-0 flex items-center">
											<div
												className={
													AUTH_CLASSES.social.divider
														.line
												}
											/>
										</div>
										<div className="relative flex justify-center text-xs uppercase">
											<span
												className={
													AUTH_CLASSES.social.divider
														.text
												}
											>
												or
											</span>
										</div>
									</div>
								</>
							)}

							{children}

							<div className="flex items-center justify-between text-sm">
								<label className="group flex items-center gap-2 cursor-pointer">
									<FancyCheckbox
										checked={rememberMe}
										onChange={setRememberMe}
									/>
									<span className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
										Remember me
									</span>
								</label>

								{isFeatureEnabled('FORGOT_PASSWORD') && (
									<button className="text-neutral-400 hover:text-neutral-300 transition-colors">
										Forgot password?
									</button>
								)}
							</div>
						</motion.div>
					</motion.div>
				</main>

				<AuthQuote />
			</div>
		</div>
	)
}
