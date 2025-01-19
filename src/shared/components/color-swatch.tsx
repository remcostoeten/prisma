'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

type ColorSwatchProps = {
	color: string
	isSelected: boolean
	onClick: () => void
}

export function ColorSwatch({ color, isSelected, onClick }: ColorSwatchProps) {
	return (
		<motion.button
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			onClick={onClick}
			className={`relative w-8 h-8 rounded-full cursor-pointer ring-offset-background transition-all
        ${isSelected ? 'ring-2 ring-ring ring-offset-2' : 'hover:ring-1 hover:ring-ring hover:ring-offset-1'}`}
			style={{ background: color }}
		>
			{isSelected && (
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					className="absolute inset-0 flex items-center justify-center text-white"
				>
					<Check className="w-4 h-4 stroke-[3]" />
				</motion.div>
			)}
		</motion.button>
	)
}
