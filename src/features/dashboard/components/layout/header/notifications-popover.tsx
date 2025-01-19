'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Archive, Settings2, Inbox } from 'lucide-react'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/shared/components/ui'

export function NotificationsPopover() {
	const [isOpen, setIsOpen] = React.useState(false)

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<button className="relative flex h-8 w-8 items-center justify-center rounded-md hover:bg-emerald-500/5 hover:text-emerald-400 transition-colors">
					<Bell className="h-4 w-4" />
					<span className="absolute right-1 top-1 flex h-2 w-2">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
						<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
					</span>
				</button>
			</PopoverTrigger>
			<PopoverContent
				className="w-[380px] p-0 bg-[#0A0A0A] border-[#1f1f1f]"
				align="end"
				sideOffset={8}
			>
				<Tabs defaultValue="inbox" className="w-full">
					<div className="flex items-center justify-between border-b border-[#1f1f1f] px-3">
						<TabsList className="h-12 bg-transparent p-0">
							<TabsTrigger
								value="inbox"
								className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-3 font-semibold text-neutral-400 hover:text-emerald-400 data-[state=active]:border-emerald-400 data-[state=active]:text-emerald-400"
							>
								Inbox
								<span className="ml-2 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
									0
								</span>
							</TabsTrigger>
							<TabsTrigger
								value="archived"
								className="relative h-12 rounded-none border-b-2 border-transparent px-4 pb-3 pt-3 font-semibold text-neutral-400 hover:text-emerald-400 data-[state=active]:border-emerald-400 data-[state=active]:text-emerald-400"
							>
								Archived
							</TabsTrigger>
						</TabsList>
						<button className="p-2 hover:text-emerald-400 transition-colors">
							<Settings2 className="h-4 w-4" />
						</button>
					</div>
					<TabsContent
						value="inbox"
						className="min-h-[350px] focus-visible:outline-none"
					>
						<div className="flex min-h-[350px] flex-col items-center justify-center gap-2 p-8 text-center">
							<div className="rounded-full border border-neutral-800 p-3">
								<Inbox className="h-6 w-6 text-neutral-400" />
							</div>
							<div className="text-sm font-medium text-white">
								All caught up
							</div>
							<div className="text-xs text-neutral-400">
								You will be notified here for any notices on
								your organizations and projects
							</div>
						</div>
					</TabsContent>
					<TabsContent
						value="archived"
						className="min-h-[350px] focus-visible:outline-none"
					>
						<div className="flex min-h-[350px] flex-col items-center justify-center gap-2 p-8 text-center">
							<div className="rounded-full border border-neutral-800 p-3">
								<Archive className="h-6 w-6 text-neutral-400" />
							</div>
							<div className="text-sm font-medium text-white">
								No archived notifications
							</div>
							<div className="text-xs text-neutral-400">
								Archived notifications will appear here
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</PopoverContent>
		</Popover>
	)
}
