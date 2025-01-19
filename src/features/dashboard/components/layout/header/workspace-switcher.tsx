'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandInput, CommandSeparator } from '@/shared/components/ui/command'

type Workspace = {
	label: string
	value: string
}

const workspaces: Workspace[] = [
	{
		label: 'Personal Project',
		value: 'personal'
	},
	{
		label: 'Acme Corp',
		value: 'acme'
	},
	{
		label: 'Startup Project',
		value: 'startup'
	}
]

interface WorkspaceSwitcherProps {
	isCollapsed: boolean
}

export function WorkspaceSwitcher({ isCollapsed }: WorkspaceSwitcherProps) {
	const [open, setOpen] = React.useState(false)
	const [selectedWorkspace, setSelectedWorkspace] = React.useState<Workspace>(
		workspaces[0]
	)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button className="group relative flex h-10 w-full items-center text-neutral-400 transition-all duration-300 ease-in-out hover:text-white cursor-pointer">
					<span className="flex h-10 w-10 items-center justify-center">
						<div className="relative h-6 w-6 overflow-hidden rounded-full bg-[#1f1f1f] flex items-center justify-center text-xs font-medium text-white">
							{selectedWorkspace.label.charAt(0)}
						</div>
					</span>
					<div
						className={cn(
							'ml-2 flex flex-col text-left transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
							isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
						)}
					>
						<span className="text-sm font-medium text-white">
							{selectedWorkspace.label}
						</span>
						<span className="text-xs text-neutral-500">
							Workspace
						</span>
					</div>
					<ChevronsUpDown
						className={cn(
							'h-4 w-4 shrink-0 opacity-50 ml-auto',
							isCollapsed ? 'hidden' : 'block'
						)}
					/>
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-[300px] p-0 b border border-[#1f1f1f] rounded-lg shadow-xl">
				<Command className="bg-transparent">
					<CommandInput
						placeholder="Search workspace..."
						className="h-9 border-0 bg-transparent text-sm text-neutral-400 focus:ring-0 placeholder:text-neutral-500"
					/>
					<CommandList>
						<CommandEmpty className="py-6 text-sm text-neutral-400">
							No workspace found.
						</CommandEmpty>
						<CommandGroup>
							{workspaces.map((workspace) => (
								<CommandItem
									key={workspace.value}
									onSelect={() => {
										setSelectedWorkspace(workspace)
										setOpen(false)
									}}
									className="flex items-center gap-3 px-4 py-2 hover:bg-[#1f1f1f] cursor-pointer"
								>
									<div className="relative h-8 w-8 overflow-hidden rounded-full bg-[#1f1f1f] flex items-center justify-center text-sm font-medium text-white">
										{workspace.label.charAt(0)}
									</div>
									<div className="flex flex-col">
										<span className="text-sm font-medium text-white">
											{workspace.label}
										</span>
										<span className="text-xs text-neutral-500">
											Workspace
										</span>
									</div>
									{selectedWorkspace.value ===
										workspace.value && (
										<Check className="ml-auto h-4 w-4 text-neutral-400" />
									)}
								</CommandItem>
							))}
						</CommandGroup>
						<CommandSeparator className="my-2 bg-[#1f1f1f]" />
						<CommandGroup>
							<CommandItem
								onSelect={() =>
									console.log('Create new workspace')
								}
								className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-400 hover:bg-[#1f1f1f] cursor-pointer"
							>
								<Plus className="h-4 w-4" />
								Create new workspace
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
