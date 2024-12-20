'use client'

import { Logo } from '@/components/theme/logo'
import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/core/config/site'
import { CLASSES, ANIMATION_VARIANTS } from '@/core/config/constants'
import { Github, Loader2 } from 'lucide-react'
import { isFeatureEnabled } from '@/core/config/feature-flags'
import { toast } from 'sonner'
import { Flex } from '@/shared/atoms'
import { Tooltip } from '@/shared/components/custom/tooltip/tooltip'
import { AuthQuote } from '@/components/auth'

interface SocialButtonProps extends Omit<React.ComponentProps<typeof motion.button>, 'ref'> {
  icon: ReactNode
  children: ReactNode
  isLoading?: boolean
}

const SocialButton = ({ icon, children, isLoading, ...props }: SocialButtonProps) => (
  <motion.button
    className={CLASSES.social.button}
    variants={ANIMATION_VARIANTS.buttonHover}
    initial="rest"
    whileHover="hover"
    whileTap={{ scale: 0.98 }}
    disabled={isLoading}
    {...props}
  >
    <div className={CLASSES.social.icon}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
    </div>
    <span className={CLASSES.social.text}>
      {isLoading ? 'Connecting...' : children}
    </span>
  </motion.button>
)

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGithubLogin = async () => {
    try {
      setIsLoading(true)
      window.location.href = '/api/auth/github'
    } catch (error) {
      console.error('GitHub login failed:', error)
      toast.error('GitHub login failed')
      setIsLoading(false)
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
                <Flex align="center" gap="2" className="absolute top-4 left-4">
                  <Logo className="h-6" />
                  <Flex dir="col">
                    <span className="text-offwhite">rollyourownauth</span>
                    <Tooltip content="A self-implemented authentication system" placement="right">
                      <i className="text-text-alt text-[14px]">Btw, I rolled my own auth</i>
                    </Tooltip>
                  </Flex>
                </Flex>
                <motion.h1
                  variants={ANIMATION_VARIANTS.fadeInUp}
                  className="text-2xl font-medium font-geist-mono"
                >
                  Sign up
                </motion.h1>
              </div>
              <motion.p
                variants={ANIMATION_VARIANTS.fadeInUp}
                className="text-sm text-neutral-400 font-inter"
              >
                Create your account to get started
              </motion.p>
            </div>

            <motion.div variants={ANIMATION_VARIANTS.fadeInUp} className="space-y-4">
              {isFeatureEnabled('SOCIAL_LOGIN') && (
                <>
                  <SocialButton
                    icon={<Github className="mr-2 h-4 w-4" />}
                    onClick={handleGithubLogin}
                    isLoading={isLoading}
                  >
                    Continue with GitHub
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
            </motion.div>
          </motion.div>
        </main>

        <AuthQuote />
      </div>

      <footer className="px-6 py-4 text-center text-xs text-neutral-400">
        <p>
          By continuing, you agree to <i>{siteConfig.name}</i>{' '}
          <a href="#" className="underline hover:text-white transition-colors">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-white transition-colors">
            Privacy Policy
          </a>
          , and to receive periodic emails with updates.
        </p>
      </footer>
    </div>
  )
}
