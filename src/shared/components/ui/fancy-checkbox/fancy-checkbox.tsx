/**
 * @author remcostoeten
 * @description A fancy animated checkbox component with accessibility features.
 * Supports labels, descriptions, error states, and keyboard interactions.
 */

'use client'

import { useId } from 'react'
import { cn } from '@/shared/helpers/utils'
import styles from './fancy-checkbox.module.css'

/**
 * Props for the FancyCheckbox component
 * @typedef {Object} FancyCheckboxProps
 * @property {boolean} [checked] - Whether the checkbox is checked
 * @property {(checked: boolean) => void} [onChange] - Callback when checkbox state changes
 * @property {string} [className] - Additional CSS classes
 * @property {boolean} [disabled] - Whether the checkbox is disabled
 * @property {boolean} [required] - Whether the checkbox is required
 * @property {string} [name] - Name attribute for form submission
 * @property {string} [value] - Value attribute for form submission
 * @property {string} [label] - Label text
 * @property {string} [description] - Description text
 * @property {string} [error] - Error message
 * @property {string} [id] - Custom ID for the checkbox
 */
type FancyCheckboxProps = {
	checked?: boolean
	onChange?: (checked: boolean) => void
	className?: string
	disabled?: boolean
	required?: boolean
	name?: string
	value?: string
	label?: string
	description?: string
	error?: string
	id?: string
}

/**
 * A fancy checkbox component with animations and accessibility features
 * @param {FancyCheckboxProps} props - Component props
 * @returns {JSX.Element} Rendered checkbox component
 */
export default function FancyCheckbox({
	checked = false,
	onChange,
	className,
	disabled = false,
	required = false,
	name,
	value,
	label,
	description,
	error,
	id: providedId,
}: FancyCheckboxProps) {
	const generatedId = useId()
	const id = providedId || generatedId

	return (
		<div className={cn('relative flex items-start', className)}>
			<div className="flex items-center h-5">
				<label
					className={cn(
						styles.container,
						disabled && 'opacity-50 cursor-not-allowed',
						error && 'border-red-500'
					)}
				>
					<input
						type="checkbox"
						id={id}
						name={name}
						value={value}
						checked={checked}
						disabled={disabled}
						required={required}
						onChange={(e) => onChange?.(e.target.checked)}
						className="sr-only"
						aria-describedby={`${id}-description`}
						aria-invalid={!!error}
						data-state={checked ? 'checked' : 'unchecked'}
					/>
					<svg
						width="24"
						height="24"
						viewBox="0 0 64 64"
						aria-hidden="true"
						className={cn(
							'transition-colors',
							disabled && 'cursor-not-allowed'
						)}
					>
						<path
							className={cn(
								styles.path,
								checked && styles.checked,
								error && 'stroke-red-500'
							)}
							d="M 0 16 V 56 A 8 8 0 0 0 8 64 H 56 A 8 8 0 0 0 64 56 V 8 A 8 8 0 0 0 56 0 H 8 A 8 8 0 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 0 0 0 56 0 H 8 A 8 8 0 0 0 0 8 V 16"
						/>
					</svg>
				</label>
			</div>
			{(label || description || error) && (
				<div className="ml-3 text-sm">
					{label && (
						<label
							htmlFor={id}
							className={cn(
								'font-medium text-gray-700 dark:text-gray-200',
								disabled && 'opacity-50 cursor-not-allowed',
								error && 'text-red-500'
							)}
						>
							{label}
							{required && <span className="text-red-500 ml-1">*</span>}
						</label>
					)}
					{description && (
						<p
							id={`${id}-description`}
							className="text-gray-500 dark:text-gray-400"
						>
							{description}
						</p>
					)}
					{error && (
						<p className="mt-1 text-sm text-red-500" role="alert">
							{error}
						</p>
					)}
				</div>
			)}
		</div>
	)
}
