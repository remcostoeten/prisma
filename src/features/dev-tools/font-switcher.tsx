'use client'

import React, { useEffect, useState } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/components/ui/select'
import { toast } from 'sonner'
import { isFeatureEnabled } from '@/core/config/feature-flags'
import { fontOptions } from '@/core/config/fonts/font-config'

export default function FontSwitcher() {
	const [mounted, setMounted] = useState(false)
	const [currentFont, setCurrentFont] = useState<string>(
		fontOptions[0].className
	)
	const [initialFontSet, setInitialFontSet] = useState(false)

	// Handle initial font detection after mount
	useEffect(() => {
		setMounted(true)
		try {
			const bodyClasses = document.body.className.split(' ')
			const currentFontClass = bodyClasses.find((className) =>
				fontOptions.some((font) => font.className === className)
			)
			if (currentFontClass) {
				setCurrentFont(currentFontClass)
				setInitialFontSet(true)
			}
		} catch (error) {
			console.error('Error detecting initial font:', error)
		}
	}, [])

	// Handle font changes
	useEffect(() => {
		if (!mounted) return

		try {
			const body = document.body
			const bodyClasses = body.className.split(' ')

			// Remove any existing font classes
			const updatedClasses = bodyClasses.filter(
				(className) =>
					!fontOptions.some((font) => font.className === className)
			)

			// Add the new font class
			updatedClasses.push(currentFont)

			// Update body classes
			body.className = updatedClasses.join(' ')

			const selectedFont = fontOptions.find(
				(f) => f.className === currentFont
			)
			if (selectedFont && !initialFontSet) {
				toast.success(`Font updated to ${selectedFont.name}`)
				console.log('Font updated:', {
					name: selectedFont.name,
					class: currentFont,
					allClasses: body.className
				})
			}
		} catch (error) {
			console.error('Error updating font:', error)
			toast.error('Failed to update font')
		}
	}, [currentFont, mounted, initialFontSet])

	if (!isFeatureEnabled('FONT_SWITCHER') || !mounted) {
		return null
	}

	return (
		<div className="fixed bottom-4 right-4 z-50 max-w-fit">
			<div className="rounded-lg border bg-background/80 p-3 shadow-lg backdrop-blur-sm">
				<p className="mb-2 text-xs text-muted-foreground">Font Style</p>
				<Select onValueChange={setCurrentFont} value={currentFont}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select font" />
					</SelectTrigger>
					<SelectContent>
						{fontOptions.map((font) => (
							<SelectItem
								key={font.className}
								value={font.className}
								className={font.className}
							>
								{font.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}
