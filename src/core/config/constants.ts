export const CLASSES = {
	social: {
		button: 'group flex h-10 w-full items-center justify-center gap-2 rounded bg-[#1f1f1f] border border-[#2f2f2f] px-4 text-sm font-medium transition-all hover:bg-[#2a2a2a] hover:border-[#3f3f3f] focus:outline-none focus:ring-2 focus:ring-[#3f3f3f] focus:ring-offset-2 focus:ring-offset-[#1C1C1C]',
		icon: 'h-5 w-5 transition-transform group-hover:scale-110',
		text: 'transition-transform group-hover:translate-x-0.5',
		divider: {
			line: 'w-full border-t border-[#2f2f2f]',
			text: 'bg-[#1C1C1C] px-2 text-neutral-400'
		}
	}
} as const

export const COLORS = {
	emerald: {
		500: 'rgb(16 185 129)',
		600: 'rgb(5 150 105)'
	},
	neutral: {
		300: 'rgb(212 212 212)',
		400: 'rgb(163 163 163)'
	},
	background: {
		dark: '#1C1C1C',
		input: '#1f1f1f',
		inputHover: '#2a2a2a'
	},
	border: {
		default: '#2f2f2f',
		hover: '#3f3f3f'
	}
} as const

export const TRANSITIONS = {
	DEFAULT: 'all 0.2s ease',
	SMOOTH: 'all 0.3s ease'
} as const

export const ANIMATION_VARIANTS = {
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
		hover: {
			scale: 1.01,
			transition: {
				duration: 0.2,
				ease: 'easeInOut'
			}
		}
	}
} as const
