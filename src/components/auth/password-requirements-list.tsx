'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

type PasswordRequirement = {
	text: string
	isMet: boolean
}

type PasswordRequirementsListProps = {
	requirements: PasswordRequirement[]
}

export default function PasswordRequirementsList({
	requirements
}: PasswordRequirementsListProps) {
	return (
		<ul className="space-y-2 text-sm">
			{requirements.map((requirement, index) => (
				<motion.li
					key={index}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: index * 0.1 }}
					className="flex items-center gap-2"
				>
					{requirement.isMet ? (
						<Check className="h-4 w-4 text-green-500" />
					) : (
						<X className="h-4 w-4 text-red-500" />
					)}
					<span
						className={
							requirement.isMet
								? 'text-green-500'
								: 'text-red-500'
						}
					>
						{requirement.text}
					</span>
				</motion.li>
			))}
		</ul>
	)
}
