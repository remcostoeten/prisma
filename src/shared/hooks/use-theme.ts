import { THEME_OPTIONS } from '@/features/settings/constants/theme-options'
import { useThemeStore } from '@/shared/stores/theme/theme-store'

export function useTheme() {
  const { theme, setTheme } = useThemeStore()

  const currentTheme = THEME_OPTIONS.find((t) => t.value === theme)

  return {
    theme,
    setTheme,
    currentTheme,
    availableThemes: THEME_OPTIONS
  }
}
