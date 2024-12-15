import { themes, accentColors } from "src/shared/config/themes"
import { AppearanceState } from "src/shared/types/theme"

export function getThemeByName(name: string) {
  return themes.find(theme => theme.name === name)
}

export function saveThemePreferences(preferences: AppearanceState) {
  localStorage.setItem('theme-preferences', JSON.stringify(preferences))
  document.documentElement.style.setProperty('--accent-color', preferences.accentColor)
}

export function loadThemePreferences(): AppearanceState {
  const saved = localStorage.getItem('theme-preferences')
  return saved ? JSON.parse(saved) : {
    theme: 'dark',
    accentColor: accentColors[0].value,
    sidebarTransparent: false
  }
}

