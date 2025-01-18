import { Header } from '@/components/layout/header'
import { TopHeader } from '@/features/dashboard/components/layout/header'
import { SidebarNav } from '@/features/dashboard/components/layout/sidebar'

22
export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className="h-full">
			<body className="h-full">
				<div className="flex h-full">
					<SidebarNav />
					<div className="flex-1 flex flex-col min-w-0 overflow-hidden">
						<TopHeader />
						<main className="flex-1 overflow-y-auto">
							{children}
						</main>
					</div>
				</div>
			</body>
		</html>
	)
}
