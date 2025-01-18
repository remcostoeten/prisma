import { ThemeConfig } from './types/theme'

export const themes: ThemeConfig[] = [
	{
		name: 'dark',
		label: 'Dark',
		className: 'dark',
		colors: {
			background: '#1A1B1E',
			foreground: '#FFFFFF',
			muted: 'rgba(255,255,255,0.1)',
			border: 'rgba(255,255,255,0.1)'
		}
	},
	{
		name: 'light',
		label: 'Light',
		className: 'light',
		colors: {
			background: '#FFFFFF',
			foreground: '#000000',
			muted: 'rgba(0,0,0,0.1)',
			border: 'rgba(0,0,0,0.1)'
		}
	},
	{
		name: 'gold',
		label: 'Gold',
		className: 'gold',
		colors: {
			background: '#F5E6CC',
			foreground: '#000000',
			muted: 'rgba(0,0,0,0.1)',
			border: 'rgba(0,0,0,0.1)'
		}
	}
]

export const accentColors = [
	{ name: 'blue', value: '#3B82F6' },
	{ name: 'purple', value: '#8B5CF6' },
	{ name: 'pink', value: '#EC4899' },
	{ name: 'green', value: '#10B981' },
	{ name: 'orange', value: '#F97316' },
	{ name: 'red', value: '#EF4444' }
]
