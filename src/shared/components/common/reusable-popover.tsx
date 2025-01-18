import React from 'react'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/shared/components/ui/popover'
import { cn } from '@/lib/utils'

export interface PopoverSectionProps {
	children: React.ReactNode
	className?: string
}

export const PopoverSection: React.FC<PopoverSectionProps> = ({
	children,
	className
}) => <div className={cn('space-y-1 px-1', className)}>{children}</div>

export interface PopoverItemProps {
	icon?: React.ElementType
	label: string
	onClick?: () => void
	badge?: string | number
	rightContent?: React.ReactNode
	className?: string
}

export const PopoverItem: React.FC<PopoverItemProps> = ({
	icon: Icon,
	label,
	onClick,
	badge,
	rightContent,
	className
}) => (
	<button
		onClick={onClick}
		className={cn(
			'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-neutral-400 hover:bg-emerald-500/5 hover:text-emerald-400 transition-colors duration-200',
			className
		)}
	>
		{Icon && <Icon size={16} />}
		<span>{label}</span>
		{badge && (
			<span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-medium text-emerald-400">
				{badge}
			</span>
		)}
		{rightContent}
	</button>
)

export interface ReusablePopoverProps {
	trigger: React.ReactNode
	children: React.ReactNode
	align?: 'start' | 'center' | 'end'
	side?: 'top' | 'right' | 'bottom' | 'left'
	sideOffset?: number
	className?: string
}

export const ReusablePopover: React.FC<ReusablePopoverProps> = ({
	trigger,
	children,
	align = 'center',
	side = 'bottom',
	sideOffset = 5,
	className
}) => {
	return (
		<Popover>
			<PopoverTrigger asChild>{trigger}</PopoverTrigger>
			<PopoverContent
				className={cn(
					'w-80 p-2 bg-[#0A0A0A] border border-[#1f1f1f] rounded-lg shadow-xl z-[100]',
					className
				)}
				align={align}
				side={side}
				sideOffset={sideOffset}
			>
				<div className="flex flex-col space-y-4">{children}</div>
			</PopoverContent>
		</Popover>
	)
}

export const PopoverDivider: React.FC = () => (
	<div className="h-px bg-[#1f1f1f]" />
)

export const PopoverBanner: React.FC<{ children: React.ReactNode }> = ({
	children
}) => (
	<div className="relative overflow-hidden rounded-lg border border-emerald-500/20 bg-gradient-to-b from-emerald-500/10 to-emerald-500/5 p-3">
		<div className="relative z-10">{children}</div>
		<div className="absolute right-0 top-0 h-32 w-32 translate-x-8 translate-y--8">
			<div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-400 opacity-10 blur-2xl" />
		</div>
	</div>
)
