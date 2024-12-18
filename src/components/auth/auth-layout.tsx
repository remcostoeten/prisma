'use client'

import { Logo } from '@/components/theme/logo'
import { ReactNode } from '@/core/types'
import { motion } from 'framer-motion'
import AuthQuote from './quote'
import { siteConfig } from '@/core/config/site'
import FancyCheckbox from '@/shared/components/ui/fancy-checkbox/fancy-checkbox'
import { useRememberMe } from '@/shared/hooks/use-remember-me'
import { isFeatureEnabled } from '@/core/config/feature-flags'
import { CLASSES, ANIMATION_VARIANTS } from '@/core/config/constants'
import { Github } from 'lucide-react'

type AuthLayoutProps = {
  children: ReactNode
  title: string
  subtitle: ReactNode
}

const SocialButton = ({
  icon,
  children,
  ...props
}: { icon: ReactNode; children: ReactNode } & Omit<
  React.ComponentProps<typeof motion.button>,
  'ref'
>) => (
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
                    icon={<Github className="mr-2 h-4 w-4" />}
                    onClick={handleGithubLogin}
                  >
                    Continue with GitHub
                  </SocialButton>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className={CLASSES.social.divider.line} />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className={CLASSES.social.divider.text}>
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

      <footer className="px-6 py-4 text-center text-xs text-neutral-400">
        <p>
          By continuing, you agree to <i>{siteConfig.name}</i>{' '}
          <a
            href="#"
            className="underline hover:text-white transition-colors"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="#"
            className="underline hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          , and to receive periodic emails with updates.
        </p>
      </footer>
    </div>
  )
}
