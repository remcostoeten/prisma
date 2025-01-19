'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { TooltipProvider } from '@/shared/components/ui/tooltip'

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider> & {
	children: React.ReactNode
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<div className="min-h-screen max-h-screen bg-background text-foreground">
				{children}
			</div>
		)
	}

	return (
		<NextThemesProvider {...props}>
			<TooltipProvider delayDuration={50}>
				<div className="min-h-screen max-h-screen bg-background text-foreground transition-colors duration-300">
					{children}
				</div>
			</TooltipProvider>
		</NextThemesProvider>
	)
}
