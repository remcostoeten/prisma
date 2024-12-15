import { RootProvider } from 'fumadocs-ui/provider'
import './globals.css'
import Nav from '@/components/layout/header/nav'
import DevTools from '@/features/dev-tools/_dev-tools'
import { config } from '@/core/config'
import { isFeatureEnabled } from '@/core/config/feature-flags'
import { metadata } from './metadata'
import { ThemeProvider } from '@/components/theme-wrapper'
import { UserProvider } from '@/contexts/user-context'

export { metadata }

type RootLayoutProps = {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<body
				className={`h-screen bg-background text-foreground ${config.fonts.variables} font-geist-mono`}
				style={{ maxHeight: '100vh' }}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem={false}
					storageKey="theme"
				>
					<UserProvider>
						<Nav positionFixed={true} />
						<main
							className="flex-grow h-screen overflow-auto"
							style={{ maxHeight: 'calc(100vh - 64px)' }}
						>
							<RootProvider>{children}</RootProvider>
						</main>
						{isFeatureEnabled('DEV_TOOLS') && <DevTools />}
					</UserProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
