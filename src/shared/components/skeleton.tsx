import { motion } from 'framer-motion'

export function Skeleton() {
	return (
		<div className="space-y-2">
			<motion.div
				className="h-4 bg-white/10 rounded"
				animate={{ opacity: [0.5, 1, 0.5] }}
				transition={{
					duration: 1.5,
					repeat: Infinity,
					ease: 'easeInOut'
				}}
			/>
			<motion.div
				className="h-4 bg-white/10 rounded w-5/6"
				animate={{ opacity: [0.5, 1, 0.5] }}
				transition={{
					duration: 1.5,
					repeat: Infinity,
					ease: 'easeInOut',
					delay: 0.2
				}}
			/>
			<motion.div
				className="h-4 bg-white/10 rounded w-4/6"
				animate={{ opacity: [0.5, 1, 0.5] }}
				transition={{
					duration: 1.5,
					repeat: Infinity,
					ease: 'easeInOut',
					delay: 0.4
				}}
			/>
		</div>
	)
}
