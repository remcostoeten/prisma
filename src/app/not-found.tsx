'use client'

/**
 * @author Remco Stoeten
 * @description Monochrome 404 error page with subtle animations
 */

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/shared/components/ui/button'

export default function NotFound() {
	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2
			}
		}
	}

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { type: 'spring', stiffness: 100, damping: 20 }
		}
	}

	const glitchAnimation = {
		initial: { x: 0 },
		animate: {
			x: [-2, 2, -2, 0],
			transition: {
				duration: 0.3,
				repeat: Infinity,
				repeatDelay: 5
			}
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-4 font-sans">
			<div className="absolute inset-0 opacity-5">
				{[...Array(10)].map((_, i) => (
					<div
						key={i}
						className="absolute w-full h-px bg-white"
						style={{ top: `${i * 10}%` }}
					/>
				))}
			</div>

			<motion.div
				className="relative z-10 text-center max-w-2xl mx-auto px-4"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.div
					className="text-[12rem] font-bold leading-none tracking-tighter mb-4 text-white opacity-10 select-none font-mono"
					variants={glitchAnimation}
					initial="initial"
					animate="animate"
				>
					404
				</motion.div>

				<motion.div
					className="absolute top-0 left-0 right-0"
					variants={itemVariants}
				>
					<h1 className="text-[12rem] font-bold leading-none tracking-tighter mb-4 bg-gradient-to-b from-white to-neutral-600 bg-clip-text text-transparent select-none font-mono">
						404
					</h1>
				</motion.div>

				<motion.h2
					className="text-2xl font-light mb-8 text-neutral-400"
					variants={itemVariants}
				>
					This page has been lost in the void
				</motion.h2>

				<motion.div
					variants={itemVariants}
					className="flex justify-center items-center space-x-6"
				>
					<Link href="/">
						<Button
							variant="outline"
							size="lg"
							className="bg-transparent border-neutral-800 text-neutral-300 hover:bg-neutral-900 hover:text-white transition-all duration-300"
						>
							Return Home
						</Button>
					</Link>
				</motion.div>

				<motion.p
					variants={itemVariants}
					className="mt-12 text-sm text-neutral-600 font-mono"
				>
					Error Code: PAGE_NOT_FOUND
				</motion.p>
			</motion.div>
		</div>
	)
}
