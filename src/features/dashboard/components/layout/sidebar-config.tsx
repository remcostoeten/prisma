import React from 'react'
import { FolderClosed, Settings, Shield } from 'lucide-react'
import type { ReactNode } from 'react'

export interface SidebarConfig {
	title: string
	mainContent?: ReactNode
	showSidebar: boolean
	sidebarContent?: {
		actions?: {
			primary?: {
				label: string
				onClick?: () => void
			}
			search?: {
				placeholder: string
			}
		}
		sections: {
			title: string
			content?: ReactNode
			items?: {
				label: string
				icon?: React.ComponentType
				href?: string
				onClick?: () => void
				external?: boolean
			}[]
		}[]
	}
}

export const storageConfig: SidebarConfig = {
	title: 'Storage',
	showSidebar: true,
	sidebarContent: {
		actions: {
			primary: {
				label: 'New bucket'
			},
			search: {
				placeholder: 'Search buckets...'
			}
		},
		sections: [
			{
				title: 'ALL BUCKETS',
				content: (
					<div className="rounded-md border border-[#1f1f1f] bg-[#0A0A0A] p-4 text-center">
						<p className="text-sm text-neutral-400">
							No buckets available
						</p>
						<p className="text-xs text-neutral-600">
							Buckets that you create will appear here
						</p>
					</div>
				)
			},
			{
				title: 'CONFIGURATION',
				items: [
					{
						label: 'Policies',
						icon: Shield,
						href: '/storage/policies'
					},
					{
						label: 'Settings',
						icon: Settings,
						href: '/storage/settings'
					}
				]
			}
		]
	}
}
