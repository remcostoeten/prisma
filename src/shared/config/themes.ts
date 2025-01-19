export type Theme = {
	name: string
	value: string
	preview: {
		background: string
		foreground: string
		accent: string
	}
}

export type AccentColor = {
	name: string
	value: string
	class: string
}

export const themes: Theme[] = [
	{
		name: 'Light',
		value: 'light',
		preview: {
			background: '#ffffff',
			foreground: '#0f172a',
			accent: '#2563eb'
		}
	},
	{
		name: 'Dark',
		value: 'dark',
		preview: {
			background: '#0f172a',
			foreground: '#ffffff',
			accent: '#3b82f6'
		}
	},
	{
		name: 'Rose',
		value: 'rose',
		preview: {
			background: '#fff1f2',
			foreground: '#1f1f1f',
			accent: '#e11d48'
		}
	},
	{
		name: 'Green',
		value: 'green',
		preview: {
			background: '#f0fdf4',
			foreground: '#1f1f1f',
			accent: '#16a34a'
		}
	},
	{
		name: 'Blue',
		value: 'blue',
		preview: {
			background: '#f0f9ff',
			foreground: '#1f1f1f',
			accent: '#2563eb'
		}
	}
]

export const accentColors: AccentColor[] = [
	{ name: 'Blue', value: '#2563eb', class: 'accent-blue' },
	{ name: 'Green', value: '#16a34a', class: 'accent-green' },
	{ name: 'Purple', value: '#9333ea', class: 'accent-purple' },
	{ name: 'Rose', value: '#e11d48', class: 'accent-rose' },
	{ name: 'Orange', value: '#ea580c', class: 'accent-orange' },
	{ name: 'Cyan', value: '#0891b2', class: 'accent-cyan' }
]
