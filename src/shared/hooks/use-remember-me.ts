'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'rememberMe'

export function useRememberMe() {
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    // Load initial state from localStorage
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setRememberMe(JSON.parse(stored))
    }
  }, [])

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
  }

  return {
    rememberMe,
    setRememberMe: handleRememberMeChange
  }
} 