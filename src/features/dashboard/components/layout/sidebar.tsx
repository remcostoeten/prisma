'use client'

/**
 * @author Remco Stoeten
 * @description Navigation component with client-side routing
 */

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Command, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
	Popover,
	Input,
	PopoverContent,
	PopoverTrigger
} from '@/shared/components/ui'
import {
	Settings,
	LogOut,
	User,
	Bell,
	UserPlus,
	Shield,
	Laptop,
	Moon,
	Wallet
} from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import { getRoutes, Route, searchRoutes } from '@/services'
import { useKeyboardShortcut } from '@/shared/hooks'
import { AnimatedDialog } from '@/shared/components/common/animated-dialog'

export function SidebarNav() {
	const [isCollapsed, setIsCollapsed] = useState(true)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [searchResults, setSearchResults] = useState<Route[]>([])
	const navRef = useRef<HTMLElement>(null)
	const router = useRouter()
	const pathname = usePathname()

	const handleSearch = useCallback((query: string) => {
		setSearchQuery(query)
		setSearchResults(searchRoutes(query))
	}, [])

	const handleKeyboardShortcut = useCallback(
		(index: number) => {
			if (index < searchResults.length) {
				router.push(searchResults[index].href)
				setIsDialogOpen(false)
			}
		},
		[searchResults, router]
	)

	useKeyboardShortcut('/', (event) => {
		event.preventDefault()
		setIsDialogOpen(true)
	})

	useKeyboardShortcut('1', (event) => {
		event.preventDefault()
		handleKeyboardShortcut(0)
	})

	useKeyboardShortcut('2', (event) => {
		event.preventDefault()
		handleKeyboardShortcut(1)
	})

	// Add more shortcuts as needed

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
			const index = numbers.indexOf(event.key)
			if (index !== -1 && (event.ctrlKey || event.metaKey)) {
				event.preventDefault()
				handleKeyboardShortcut(index)
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [handleKeyboardShortcut])

	return (
		<>
			<nav
				ref={navRef}
				className={cn(
					'relative flex h-screen flex-col justify-between bg-[#0A0A0A] border-r border-[#f0f0f5] border-opacity-20 py-2 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
					isCollapsed ? 'w-14 hover:w-52' : 'w-52'
				)}
				onMouseEnter={() => setIsCollapsed(false)}
				onMouseLeave={() => setIsCollapsed(true)}
			>
				<div className="flex flex-col gap-1 z-10">
					<Link
						href="/dashboard"
						className="mx-2 mb-2 flex h-10 w-10 items-center justify-center"
					>
						<img
							src="https://supabase.com/dashboard/img/supabase-logo.svg"
							alt="Supabase"
							className="h-6 w-6"
						/>
					</Link>

					<div className="flex flex-col gap-1">
						{getRoutes().map((route) => (
							<Link
								key={route.href}
								href={route.href}
								className={cn(
									'group relative flex h-10 w-full items-center px-2 mx-1 transition-colors duration-200',
									'text-neutral-400 hover:text-emerald-400 hover:bg-emerald-500/5',
									pathname === route.href &&
										'text-emerald-400 bg-emerald-500/5'
								)}
							>
								<span className="flex h-10 w-10 items-center justify-center">
									{React.createElement(route.icon, {
										size: 20
									})}
								</span>
								<span
									className={cn(
										'ml-2 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
										isCollapsed
											? 'opacity-0 w-0'
											: 'opacity-100 w-auto'
									)}
								>
									{route.label}
								</span>
							</Link>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-1 px-2 z-10 border-t border-[#f0f0f5] border-opacity-20 pt-2">
					<button
						onClick={() => setIsDialogOpen(true)}
						className="group relative flex h-10 w-full items-center text-neutral-400 transition-all duration-300 ease-in-out hover:text-white"
					>
						<span className="flex h-10 w-10 items-center justify-center">
							<Command size={20} />
						</span>
						<span
							className={cn(
								'ml-2 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
								isCollapsed
									? 'opacity-0 w-0'
									: 'opacity-100 w-auto'
							)}
						>
							Search
						</span>
					</button>

					<Popover>
						<PopoverTrigger asChild>
							<button className="group relative flex h-10 w-full items-center text-neutral-400 transition-all duration-300 ease-in-out hover:text-white cursor-pointer">
								<span className="flex h-10 w-10 items-center justify-center">
									<div className="relative h-6 w-6 overflow-hidden rounded-full bg-neutral-700">
										<img
											src={`https://api.dicebear.com/7.x/avataaars/svg?seed=remcostoeten`}
											alt="User avatar"
											className="h-full w-full"
										/>
									</div>
								</span>
								<div
									className={cn(
										'ml-2 flex flex-col text-left transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
										isCollapsed
											? 'opacity-0 w-0'
											: 'opacity-100 w-auto'
									)}
								>
									<span className="text-sm font-medium">
										remcostoeten
									</span>
									<span className="text-xs text-neutral-500">
										remcostoeten..hotm...
									</span>
								</div>
							</button>
						</PopoverTrigger>
						<PopoverContent
							className="w-80 p-2 bg-[#0A0A0A] border border-[#1f1f1f] rounded-lg shadow-xl z-[100]"
							align="end"
							sideOffset={5}
						>
							<div className="flex flex-col space-y-4">
								{/* User Info Section */}
								<div className="p-2">
									<div className="flex items-start gap-3">
										<div className="relative h-12 w-12 overflow-hidden rounded-full bg-neutral-700">
											<img
												src={`https://api.dicebear.com/7.x/avataaars/svg?seed=remcostoeten`}
												alt="User avatar"
												className="h-full w-full"
											/>
										</div>
										<div className="flex flex-col">
											<span className="text-sm font-medium text-white">
												remcostoeten
											</span>
											<span className="text-xs text-neutral-500">
												remcostoeten..hotmail.com
											</span>
											<div className="mt-1 flex items-center gap-2">
												<span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
													Pro Plan
												</span>
											</div>
										</div>
									</div>
								</div>

								<div className="h-px bg-[#1f1f1f]" />

								{/* Account Management */}
								<div className="space-y-1 px-1">
									<button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-400 hover:bg-emerald-500/5 hover:text-emerald-400 transition-colors duration-200">
										<User size={16} />
										<span>Profile</span>
									</button>
									<button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-400 hover:bg-emerald-500/5 hover:text-emerald-400 transition-colors duration-200">
										<Settings size={16} />
										<span>Settings</span>
									</button>
									<button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-400 hover:bg-emerald-500/5 hover:text-emerald-400 transition-colors duration-200">
										<Bell size={16} />
										<span>Notifications</span>
										<span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-medium text-emerald-400">
											3
										</span>
									</button>
								</div>

								<div className="h-px bg-[#1f1f1f]" />

								{/* Billing & Teams */}
								<div className="space-y-1 px-1">
									<button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-400 hover:bg-emerald-500/5 hover:text-emerald-400 transition-colors duration-200">
										<Wallet size={16} />
										<span>Billing</span>
									</button>
									<button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-400 hover:bg-emerald-500/5 hover:text-emerald-400 transition-colors duration-200">
										<UserPlus size={16} />
										<span>Team</span>
									</button>
									<button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-400 hover:bg-emerald-500/5 hover:text-emerald-400 transition-colors duration-200">
										<Shield size={16} />
										<span>Security</span>
									</button>
								</div>

								<div className="h-px bg-[#1f1f1f]" />

								{/* Preferences */}
								<div className="space-y-1 px-1">
									<button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-400 hover:bg-emerald-500/5 hover:text-emerald-400 transition-colors duration-200">
										<Laptop size={16} />
										<span>System Preferences</span>
									</button>
									<button className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm text-neutral-400 hover:bg-emerald-500/5 hover:text-emerald-400 transition-colors duration-200">
										<div className="flex items-center gap-2">
											<Moon size={16} />
											<span>Theme</span>
										</div>
										<div className="flex items-center gap-1 text-xs">
											<span>Dark</span>
											<ChevronRight size={14} />
										</div>
									</button>
								</div>

								<div className="h-px bg-[#1f1f1f]" />

								{/* Footer Actions */}
								<div className="px-1">
									<button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-red-400 hover:bg-red-500/5 hover:text-red-300 transition-colors duration-200">
										<LogOut size={16} />
										<span>Log out</span>
									</button>
								</div>

								{/* Pro Banner */}
								<div className="relative overflow-hidden rounded-lg border border-emerald-500/20 bg-gradient-to-b from-emerald-500/10 to-emerald-500/5 p-3">
									<div className="relative z-10">
										<p className="text-sm font-medium text-emerald-400">
											Upgrade to Pro
										</p>
										<p className="mt-0.5 text-xs text-neutral-400">
											Get access to advanced features
										</p>
										<button className="mt-2 rounded-md bg-emerald-500 px-2 py-1 text-xs font-medium text-white hover:bg-emerald-600 transition-colors duration-200">
											Upgrade now
										</button>
									</div>
									<div className="absolute right-0 top-0 h-32 w-32 translate-x-8 translate-y--8">
										<div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-400 opacity-10 blur-2xl" />
									</div>
								</div>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</nav>

			<AnimatedDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
			>
				<div className="p-4 bg-[#0A0A0A] rounded-lg">
					<div className="relative">
						<Input
							type="text"
							placeholder="Search..."
							value={searchQuery}
							onChange={(e) => handleSearch(e.target.value)}
							className="w-full bg-[#1f1f1f] border-[#f0f0f5] border-opacity-20 text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
							autoFocus
						/>
						<Search
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={18}
						/>
					</div>
					<div className="mt-4 space-y-2">
						{searchResults.slice(0, 9).map((route, index) => (
							<Link
								key={route.href}
								href={route.href}
								className="flex items-center px-2 py-1 rounded-md text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors duration-200"
								onClick={() => setIsDialogOpen(false)}
							>
								<span className="mr-2">
									{React.createElement(route.icon, {
										size: 16
									})}
								</span>
								{route.label}
								<span className="ml-auto text-xs text-gray-500">
									Ctrl {index + 1}
								</span>
							</Link>
						))}
					</div>
					{searchResults.length === 0 && searchQuery && (
						<p className="text-sm text-gray-500 mt-2">
							No results found
						</p>
					)}
					<p className="mt-4 text-xs text-gray-500">
						Press{' '}
						<kbd className="px-1 py-0.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-md backdrop-blur-sm shadow-sm">
							ESC
						</kbd>{' '}
						to close
					</p>
				</div>
			</AnimatedDialog>
		</>
	)
}
