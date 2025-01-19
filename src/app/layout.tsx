'use client'

import { RootProvider } from 'fumadocs-ui/provider'
import '@/styles/globals.css'
import DevTools from '@/features/dev-tools/_dev-tools'
import { isFeatureEnabled } from '@/core/config/feature-flags'
import { ThemeProvider } from '@/components/theme-wrapper'
import { UserProvider } from '@/contexts/user-context'
import { fontVariables } from '@/core/config/fonts/font-config'
import { rootLayoutMetadata } from '@/core/config/metadata'
import { Header } from '@/components/layout/header'
import Footer from '@/components/layout/footter'

export { rootLayoutMetadata }

type RootLayoutProps = {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning className={fontVariables}>
			<body
				className="h-screen bg-body text-red-400 font-geist-mono"
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
						<Header />
						<main
							className="flex-grow h-screen overflow-auto"
							style={{ maxHeight: 'calc(100vh - 64px)' }}
						>
							<RootProvider>{children}</RootProvider>
						</main>
						{isFeatureEnabled('DEV_TOOLS') && <DevTools />}
						<Footer />
					</UserProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
