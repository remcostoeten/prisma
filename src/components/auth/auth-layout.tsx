'use client'

import { Logo } from '@/components/theme/logo'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import AuthQuote from './quote'
import { siteConfig } from '@/core/config/site'
import FancyCheckbox from '@/shared/components/ui/fancy-checkbox/fancy-checkbox'
import { useRememberMe } from '@/shared/hooks/use-remember-me'
import { isFeatureEnabled } from '@/core/config/feature-flags'
import { CLASSES, ANIMATION_VARIANTS } from '@/core/config/constants'

type AuthLayoutProps = {
	children: ReactNode
	title: string
	subtitle: ReactNode
}

const SocialButton = ({ icon, children, ...props }: { icon: ReactNode, children: ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <motion.button 
    className={CLASSES.social.button}
    variants={ANIMATION_VARIANTS.buttonHover}
    initial="rest"
    whileHover="hover"
    whileTap={{ scale: 0.98 }}
    {...props}
  >
    <div className={CLASSES.social.icon}>{icon}</div>
    <span className={CLASSES.social.text}>{children}</span>
  </motion.button>
)

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
	const { rememberMe, setRememberMe } = useRememberMe()

	return (
		<div className="flex min-h-screen flex-col bg-[#1C1C1C] text-white">
			<div className="flex flex-1">
				<main className="flex w-full flex-col items-center justify-center px-5 lg:w-1/2">
					<motion.div 
						className="w-full max-w-[400px] space-y-6"
						variants={ANIMATION_VARIANTS.container}
						initial="hidden"
						animate="show"
					>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Logo className="h-6" />
								<motion.h1
									variants={ANIMATION_VARIANTS.fadeInUp}
									className="text-2xl font-medium font-geist-mono"
								>
									{title}
								</motion.h1>
							</div>
							<motion.p 
								variants={ANIMATION_VARIANTS.fadeInUp}
								className="text-sm text-neutral-400 font-inter"
							>
								{subtitle}
							</motion.p>
						</div>

						<motion.div 
							variants={ANIMATION_VARIANTS.fadeInUp}
							className="space-y-4"
						>
							{isFeatureEnabled('SOCIAL_LOGIN') && (
								<>
									<SocialButton 
                    icon={
                      <svg viewBox="0 0 24 24" fill="white">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    }
                  >
                    Continue with GitHub
                  </SocialButton>

									<SocialButton 
                    icon={
                      <svg viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    }
                  >
                    Continue with Google
                  </SocialButton>

									<div className="relative">
										<div className="absolute inset-0 flex items-center">
											<div className={CLASSES.social.divider.line} />
										</div>
										<div className="relative flex justify-center text-xs uppercase">
											<span className={CLASSES.social.divider.text}>or</span>
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
									<span className="text-neutral-400 group-hover:text-neutral-300 transition-colors">Remember me</span>
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

			<footer className="px-6 py-4 text-center text-xs text-neutral-400">
				<p>
					By continuing, you agree to <i>{siteConfig.name}</i>{' '}
					<a href="#" className="underline hover:text-white transition-colors">Terms of Service</a>{' '}
					and{' '}
					<a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a>,
					and to receive periodic emails with updates.
				</p>
			</footer>
		</div>
	)
}