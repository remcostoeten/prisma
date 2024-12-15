'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/theme/logo'
import { useUser } from '@/contexts/user-context'
import UserMenu from '@/components/layout/header/user-menu'
import { Button } from '@/shared/components/ui/button'
import { Palette } from 'lucide-react'
import { AppearanceDialog } from '@/shared/components/appearance-dialog'

type NavProps = {
	positionFixed?: boolean
}

export default function Nav({ positionFixed = true }: NavProps) {
	const pathname = usePathname()
	const { user, isLoading } = useUser()
	const [mounted, setMounted] = useState(false)
	const [isAppearanceOpen, setIsAppearanceOpen] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	const isAuthPage = pathname === '/login' || pathname === '/register'
	if (isAuthPage) return null

	return (
		<header
			className={`flex h-16 items-center justify-between border-b border-border px-6 ${positionFixed ? 'fixed inset-x-0 top-0 z-50 bg-background' : ''}`}
		>
			<div className="flex items-center gap-6">
				<Link
					href={user ? '/dashboard' : '/'}
					className="transition-opacity hover:opacity-80"
				>
					<Logo hasLink={false} />
				</Link>
				{user && (
					<Link
						href="/dashboard"
						className="text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						Dashboard
					</Link>
				)}
			</div>
			<div className="flex items-center gap-4">
				{isLoading ? (
					<div className="h-10 w-24 animate-pulse rounded bg-muted" />
				) : user ? (
					<UserMenu user={user} />
				) : (
					<Button
						variant="ghost"
						className="text-sm text-muted-foreground hover:text-foreground"
						asChild
					>
						<Link href="/login">Sign in</Link>
					</Button>
				)}
				<Button
					variant="ghost"
					size="icon"
					className="ml-2"
					onClick={() => setIsAppearanceOpen(true)}
				>
					<Palette className="w-4 h-4" />
				</Button>
			</div>

			<AppearanceDialog
				isOpen={isAppearanceOpen}
				onCloseAction={() => setIsAppearanceOpen(false)}
			/>
		</header>
	)
}
