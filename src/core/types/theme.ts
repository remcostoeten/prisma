export type Theme = 'dark' | 'light' | 'tokyo-night' | 'catppuccin'

export type ThemeConfig = {
  name: string
  value: Theme
  description?: string
}
