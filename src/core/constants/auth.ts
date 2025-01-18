/**
 * @author Remco Stoeten
 * @description Auth-specific constants, classes and animations
 */

export const AUTH_CLASSES = {
	social: {
		button: 'group flex h-10 w-full items-center justify-center gap-2 rounded bg-[#1f1f1f] border border-[#2f2f2f] px-4 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#3f3f3f] focus:ring-offset-2 focus:ring-offset-[#1C1C1C]',
		icon: 'h-5 w-5',
		text: 'text-neutral-300',
		divider: {
			line: 'w-full border-t border-[#2f2f2f]',
			text: 'bg-[#1C1C1C] px-2 text-neutral-400'
		}
	}
} as const

export const AUTH_ANIMATIONS = {
	container: {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
				delayChildren: 0.01
			}
		}
	},
	fadeInUp: {
		hidden: { opacity: 0, y: 5 },
		show: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				duration: 0.2,
				bounce: 0
			}
		}
	},
	buttonHover: {
		rest: { scale: 1 },
		hover: { scale: 1 }
	}
} as const
