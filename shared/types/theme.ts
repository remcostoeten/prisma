export type ThemeConfig = {
  name: string
  label: string
  className: string
  colors: {
    background: string
    foreground: string
    muted: string
    border: string
  }
}

export type AppearanceState = {
  theme: string
  accentColor: string
  sidebarTransparent: boolean
}

