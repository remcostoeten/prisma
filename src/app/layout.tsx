'use client'

import { RootProvider } from 'fumadocs-ui/provider'
import './globals.css'
import Nav from '@/components/layout/header/nav'
import DevTools from '@/features/dev-tools/_dev-tools'
import { isFeatureEnabled } from '@/core/config/feature-flags'
import { ThemeProvider } from '@/components/theme-wrapper'
import { UserProvider } from '@/contexts/user-context'
import { fontVariables } from '@/core/config/fonts/font-config'
import { rootLayoutMetadata } from '@/core/config/metadata'
import { Toaster } from 'sonner'

export { rootLayoutMetadata }

export default function RootLayout({ children }: PageProps) {
	return (
		<html lang="en" suppressHydrationWarning className={fontVariables}>
			<body
				className="h-screen bg-background text-foreground font-geist-mono"
				style={{ maxHeight: '100vh' }}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem={false}
					storageKey="theme"
					themes={['light', 'dark', 'rose', 'green', 'blue']}
				>
					<UserProvider>
						<Nav positionFixed={true} />
						<main
							className="flex-grow h-screen overflow-auto"
							style={{ maxHeight: 'calc(100vh - 64px)' }}
						>
							<RootProvider>{children}</RootProvider>
						</main>
						{isFeatureEnabled('SHOW_NOTIFICATIONS') && <Toaster position="top-right" />}
						{isFeatureEnabled('DEV_TOOLS') && <DevTools />}
					</UserProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
