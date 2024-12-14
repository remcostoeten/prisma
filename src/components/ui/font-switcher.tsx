'use client'

import { useEffect, useState } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/components/ui/select'
import { toast } from 'sonner'
import { FeatureFlag, isFeatureEnabled } from '@/core/config/feature-flags'
import { fontOptions } from '@/core/config/fonts/font-config'

export default function FontSwitcher() {
	const [currentFont, setCurrentFont] = useState(fontOptions[0].className)

	useEffect(() => {
		const body = document.body
		// Remove any existing font classes
		const existingClasses = body.className
			.split(' ')
			.filter(
				(cls) => !fontOptions.some((font) => font.className === cls)
			)
		// Add new font class while preserving other classes
		body.className = [...existingClasses, currentFont].join(' ')
		toast.success('Font style updated')
	}, [currentFont])

	if (!isFeatureEnabled(FeatureFlag.FONT_SWITCHER)) {
		return null
	}

	return (
		<div className="max-w-fit right-4 m-2 z-50">
			<div className="bg-background/80 backdrop-blur-sm p-3 rounded-lg border shadow-lg">
				<p className="text-xs text-muted-foreground mb-2">Font Style</p>
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
