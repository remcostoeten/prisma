'use client'

import * as React from 'react'

import { cn } from '@/shared/helpers/utils'

export type InputProps = React.ComponentProps<'input'> & {
	error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, error, ...props }, ref) => {
		return (
			<div className="relative w-full">
				<input
					type={type}
					className={cn(
						'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hover:border-muted-foreground/50 hover:bg-accent/5',
						error &&
							'border-red-500 focus-visible:ring-red-500 hover:border-red-500/70',
						className
					)}
					ref={ref}
					{...props}
				/>
				{error && (
					<span className="mt-1 text-xs text-red-500">{error}</span>
				)}
			</div>
		)
	}
)
Input.displayName = 'Input'

export { Input }
