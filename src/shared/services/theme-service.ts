import { themes, accentColors } from '../config/themes'

type ThemePreferences = {
  theme: string
  accentColor: string
  sidebarTransparent?: boolean
}

const THEME_PREFERENCES_KEY = 'theme-preferences'

export function saveThemePreferences(preferences: ThemePreferences): void {
  if (typeof window === 'undefined') return
  
  // Save to localStorage
  localStorage.setItem(THEME_PREFERENCES_KEY, JSON.stringify(preferences))
  
  // Apply accent color
  const accentColor = accentColors.find(color => color.value === preferences.accentColor)
  if (accentColor) {
    document.documentElement.style.setProperty('--accent-color', accentColor.value)
    
    // Update accent color class
    document.documentElement.classList.forEach(className => {
      if (className.startsWith('accent-')) {
        document.documentElement.classList.remove(className)
      }
    })
    document.documentElement.classList.add(accentColor.class)
  }

  // Apply theme class
  const theme = themes.find(t => t.value === preferences.theme)
  if (theme) {
    document.documentElement.classList.forEach(className => {
      if (themes.some(t => t.value === className)) {
        document.documentElement.classList.remove(className)
      }
    })
    if (theme.value !== 'system') {
      document.documentElement.classList.add(theme.value)
    }
  }

  // Apply sidebar transparency
  if (preferences.sidebarTransparent) {
    document.documentElement.classList.add('sidebar-transparent')
  } else {
    document.documentElement.classList.remove('sidebar-transparent')
  }
}

export function loadThemePreferences(): ThemePreferences {
  if (typeof window === 'undefined') {
    return {
      theme: 'dark',
      accentColor: accentColors[0].value,
      sidebarTransparent: false
    }
  }

  try {
    const saved = localStorage.getItem(THEME_PREFERENCES_KEY)
    if (!saved) {
      return {
        theme: 'dark',
        accentColor: accentColors[0].value,
        sidebarTransparent: false
      }
    }

    const preferences = JSON.parse(saved) as ThemePreferences
    
    // Validate theme
    if (!themes.some(t => t.value === preferences.theme)) {
      preferences.theme = 'dark'
    }
    
    // Validate accent color
    if (!accentColors.some(c => c.value === preferences.accentColor)) {
      preferences.accentColor = accentColors[0].value
    }

    return preferences
  } catch (error) {
    console.error('Error loading theme preferences:', error)
    return {
      theme: 'dark',
      accentColor: accentColors[0].value,
      sidebarTransparent: false
    }
  }
} 