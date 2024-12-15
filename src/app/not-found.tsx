'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from 'ui'
import { themes, ThemeSwitcher, useTheme } from '@/features/theme'

export default function NotFound() {
  const { theme, changeTheme } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`min-h-screen flex flex-col items-center justify-center p-4 ${themes[theme].background} ${themes[theme].text}`}
      >
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className={`text-8xl font-bold mb-4 ${themes[theme].primary}`}
            variants={itemVariants}
          >
            404
          </motion.h1>
          <motion.h2 
            className="text-4xl font-semibold mb-6"
            variants={itemVariants}
          >
            Page Not Found
          </motion.h2>
          <motion.p 
            className={`text-xl mb-8 ${themes[theme].secondary}`}
            variants={itemVariants}
          >
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link href="/" passHref>
              <Button
                className={`px-6 py-3 ${themes[theme].accent} ${themes[theme].text} rounded-md font-medium`}
              >
                Go Home
              </Button>
            </Link>
            <ThemeSwitcher theme={theme} changeTheme={changeTheme} />
          </motion.div>
        </motion.div>
        <motion.div
          className={`absolute bottom-4 text-sm ${themes[theme].secondary}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          © {new Date().getFullYear()} Your Company Name
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

