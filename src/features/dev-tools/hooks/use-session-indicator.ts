'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/state/auth'
import { isFeatureEnabled } from '@/core/config/feature-flags'

export function useSessionIndicator() {
	const { user, isLoading } = useUser()
	const [isHovered, setIsHovered] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		setIsVisible(isFeatureEnabled('SHOW_SESSION_INDICATOR'))
	}, [])

	const handleMouseEnter = () => setIsHovered(true)
	const handleMouseLeave = () => setIsHovered(false)

	return {
		user,
		isLoading,
		isHovered,
		isVisible,
		mounted,
		handleMouseEnter,
		handleMouseLeave
	}
}
