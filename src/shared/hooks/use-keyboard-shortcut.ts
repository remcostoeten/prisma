'use client'

import { useEffect, useCallback } from 'react'

type KeyHandler = (event: KeyboardEvent) => void

export function useKeyboardShortcut(key: string, callback: KeyHandler) {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        callback(event)
      }
    },
    [key, callback]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])
}

