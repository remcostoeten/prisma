import type { Config } from 'tailwindcss'

const config = {
	darkMode: ['class'],
	content: [
		'./src/**/*.{ts,tsx}',
		'./src/app/**/*.{ts,tsx}',
		'./src/components/**/*.{ts,tsx}',
		'./src/shared/**/*.{ts,tsx}'
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'geist-mono': ['var(--font-geist-mono)', 'monospace'],
				inter: ['var(--font-inter)', 'sans-serif'],
				'jetbrains-mono': ['var(--font-jetbrains-mono)', 'monospace'],
				'ibm-plex-mono': ['var(--font-ibm-plex-mono)', 'monospace']
			},
			colors: {
				brand: 'var(--brand)',
				primary: 'var(--text-primary)',
				secondary: 'var(--text-secondary)',
				muted: 'var(--text-muted)',
				disabled: 'var(--text-disabled)',
				body: 'var(--body)',
				section: 'var(--section)',
				block: 'var(--block)',
				card: 'var(--card)',
				badge: 'var(--badge)',
				'border-trans-badge': 'var(--border-trans-badge)',
				border: 'var(--border)',
				'active-bg': 'var(--active-bg)',
				'white': 'rgb(220,220,220)',
				background: {
					DEFAULT: '#050505'
				},
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'var(--accent-color)',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'var(--accent-color)',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: '#0A0A0A',
					foreground: '#0A0A0A'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
