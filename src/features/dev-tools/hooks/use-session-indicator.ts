
'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/shared/hooks/use-auth'
import { isFeatureEnabled, FeatureFlag } from '@/core/config/feature-flags'

export function useSessionIndicator() {
  const { user } = useAuth()
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsVisible(isFeatureEnabled(FeatureFlag.SHOW_SESSION_INDICATOR))
  }, [])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  return {
    user,
    isHovered,
    isVisible,
    mounted,
    handleMouseEnter,
    handleMouseLeave,
  }
}

