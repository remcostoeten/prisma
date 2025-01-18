import type { HTMLMotionProps } from 'framer-motion'
import type { Target, TargetAndTransition, VariantLabels } from 'framer-motion'

declare global {
	type MotionVariants = {
		[key: string]: {
			[key: string]: number | string | object
		}
	}

	type MotionProps<T = HTMLDivElement> = HTMLMotionProps<T> & {
		variants?: MotionVariants
		initial?: boolean | Target | VariantLabels
		animate?: TargetAndTransition | VariantLabels
		exit?: TargetAndTransition | VariantLabels
		transition?: {
			duration?: number
			delay?: number
			ease?: string | number[]
			type?: 'tween' | 'spring' | 'inertia'
			stiffness?: number
			damping?: number
			mass?: number
			bounce?: number
		}
	}

	type MotionComponent<T = HTMLDivElement> = React.ForwardRefExoticComponent<
		MotionProps<T> & React.RefAttributes<T>
	>
}
