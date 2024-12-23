import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme } from '@/core/types/theme'

type ThemeState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => {
        set({ theme })
        document.documentElement.setAttribute('data-theme', theme)
      }
    }),
    {
      name: 'theme-storage'
    }
  )
)
