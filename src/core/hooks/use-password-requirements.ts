'use client'

import { useMemo } from 'react'

export function usePasswordRequirements(password: string) {
	const requirements = useMemo(
		() => [
			{
				text: 'At least 8 characters long',
				isMet: password.length >= 8
			},
			{
				text: 'Contains at least one uppercase letter',
				isMet: /[A-Z]/.test(password)
			},
			{
				text: 'Contains at least one lowercase letter',
				isMet: /[a-z]/.test(password)
			},
			{
				text: 'Contains at least one number',
				isMet: /\d/.test(password)
			},
			{
				text: 'Contains at least one special character',
				isMet: /[!@#$%^&*(),.?":{}|<>]/.test(password)
			}
		],
		[password]
	)

	const isValid = requirements.every((req) => req.isMet)

	return { requirements, isValid }
}
