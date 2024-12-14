'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

type PasswordStrengthMeterProps = {
	password: string
}

type StrengthCheck = {
	regex: RegExp
	label: string
}

const strengthChecks: StrengthCheck[] = [
	{ regex: /[a-z]/, label: 'lowercase' },
	{ regex: /[A-Z]/, label: 'uppercase' },
	{ regex: /[0-9]/, label: 'number' },
	{ regex: /[^a-zA-Z0-9]/, label: 'special' }
]

const getPasswordStrength = (password: string) => {
	if (!password) return 0

	const checks = strengthChecks.filter((check) => check.regex.test(password))
	const lengthScore = password.length >= 8 ? 1 : 0

	return Math.min(checks.length + lengthScore, 5)
}

const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
const strengthColors = [
	'bg-red-500',
	'bg-orange-500',
	'bg-yellow-500',
	'bg-lime-500',
	'bg-green-500'
]

export function PasswordStrengthMeter({
	password
}: PasswordStrengthMeterProps) {
	const strength = useMemo(() => getPasswordStrength(password), [password])
	const strengthLabel = strengthLabels[Math.max(0, strength - 1)]
	const strengthColor = strengthColors[Math.max(0, strength - 1)]

	return (
		<div className="space-y-2">
			<div className="flex h-2 gap-1">
				{[1, 2, 3, 4, 5].map((level) => (
					<div
						key={level}
						className={cn(
							'h-full flex-1 rounded-full transition-colors',
							level <= strength ? strengthColor : 'bg-gray-200'
						)}
					/>
				))}
			</div>
			{password && (
				<div className="text-sm">
					<span>Password strength: </span>
					<span
						className={cn(
							'font-medium',
							strengthColor.replace('bg-', 'text-')
						)}
					>
						{strengthLabel}
					</span>
				</div>
			)}
			<div className="text-xs text-gray-500">
				Password must:
				<ul className="ml-4 list-disc">
					<li>Be at least 8 characters long</li>
					<li>Contain at least one lowercase letter</li>
					<li>Contain at least one uppercase letter</li>
					<li>Contain at least one number</li>
					<li>Contain at least one special character</li>
				</ul>
			</div>
		</div>
	)
}
