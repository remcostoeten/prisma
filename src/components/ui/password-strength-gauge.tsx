'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type PasswordStrength =
	| 'very-weak'
	| 'weak'
	| 'medium'
	| 'strong'
	| 'very-strong'

type PasswordStrengthGaugeProps = {
	password: string
	className?: string
}

export function PasswordStrengthGauge({
	password,
	className
}: PasswordStrengthGaugeProps) {
	const [strength, setStrength] = useState<PasswordStrength>('very-weak')
	const [score, setScore] = useState(0)

	useEffect(() => {
		// Calculate password strength
		const hasLength = password.length >= 8
		const hasUpperCase = /[A-Z]/.test(password)
		const hasLowerCase = /[a-z]/.test(password)
		const hasNumbers = /\d/.test(password)
		const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password)

		let currentScore = 0
		if (hasLength) currentScore++
		if (hasUpperCase) currentScore++
		if (hasLowerCase) currentScore++
		if (hasNumbers) currentScore++
		if (hasSpecialChars) currentScore++

		setScore(currentScore)

		// Set strength based on score
		if (currentScore === 0) setStrength('very-weak')
		else if (currentScore === 1) setStrength('weak')
		else if (currentScore === 2) setStrength('medium')
		else if (currentScore === 3) setStrength('strong')
		else setStrength('very-strong')
	}, [password])

	const strengthColors = {
		'very-weak': 'bg-red-500',
		weak: 'bg-orange-500',
		medium: 'bg-yellow-500',
		strong: 'bg-green-500',
		'very-strong': 'bg-emerald-500'
	}

	return (
		<div className={cn('w-full space-y-2', className)}>
			<div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
				<div
					className={cn(
						'h-full transition-all duration-300',
						strengthColors[strength]
					)}
					style={{ width: `${(score / 5) * 100}%` }}
				/>
			</div>
			<p className="text-xs text-muted-foreground capitalize">
				{strength.replace('-', ' ')}
			</p>
		</div>
	)
}
