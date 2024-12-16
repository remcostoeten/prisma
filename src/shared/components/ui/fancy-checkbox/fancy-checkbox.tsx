'use client'

import { cn } from 'helpers'
import styles from '@/styles/modules/fancy-checkbox.module.css'

type FancyCheckboxProps = {
	checked?: boolean
	onChange?: (checked: boolean) => void
	className?: string
}

export default function FancyCheckbox({
	checked = false,
	onChange,
	className
}: FancyCheckboxProps) {
	return (
		<label className={cn(styles.container, className)}>
			<input
				type="checkbox"
				checked={checked}
				onChange={(e) => onChange?.(e.target.checked)}
			/>
			<svg width="24" height="24" viewBox="0 0 64 64">
				<path
					className={cn(
						styles.path,
						"stroke-[var(--accent-color)] fill-none",
						"group-data-[checked=true]:fill-[var(--accent-color)]"
					)}
					d="M 0 16 V 56 A 8 8 0 0 0 8 64 H 56 A 8 8 0 0 0 64 56 V 8 A 8 8 0 0 0 56 0 H 8 A 8 8 0 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 0 0 0 56 0 H 8 A 8 8 0 0 0 0 8 V 16"
				/>
			</svg>
		</label>
	)
}

