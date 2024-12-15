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
	const [currentFont, setCurrentFont] = useState<string>(() => {
		// Try to get the initial font from the body class
		if (typeof window !== 'undefined') {
			const bodyClasses = document.body.className.split(' ')
			const currentFontClass = bodyClasses.find(className => 
				fontOptions.some(font => font.className === className)
			)
			return currentFontClass || fontOptions[0].className
		}
		return fontOptions[0].className
	})

	useEffect(() => {
		try {
			const body = document.body
			const bodyClasses = body.className.split(' ')
			
			// Remove any existing font classes
			const updatedClasses = bodyClasses.filter(className => 
				!fontOptions.some(font => font.className === className)
			)
			
			// Add the new font class
			updatedClasses.push(currentFont)
			
			// Update body classes
			body.className = updatedClasses.join(' ')
			
			const selectedFont = fontOptions.find(f => f.className === currentFont)
			if (selectedFont) {
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
	}, [currentFont])

	if (!isFeatureEnabled('FONT_SWITCHER')) {
		return null
	}

	return (
		<div className="fixed bottom-4 right-4 z-50 max-w-fit">
			<div className="rounded-lg border bg-background/80 p-3 shadow-lg backdrop-blur-sm">
				<p className="mb-2 text-xs text-muted-foreground">Font Style</p>
				<Select
					onValueChange={setCurrentFont}
					defaultValue={currentFont}
				>
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
