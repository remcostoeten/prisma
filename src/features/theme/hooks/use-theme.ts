'use client'

import { useState, useEffect } from 'react'
import { type ThemeName, themes } from '@/features/theme/config/theme'

export const useTheme = () => {
	const [theme, setTheme] = useState<ThemeName>('dark')

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') as ThemeName | null
		if (savedTheme && themes && themes[savedTheme]) {
			setTheme(savedTheme)
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme('dark')
		}
	}, [])

	useEffect(() => {
		if (themes && theme) {
			document.documentElement.classList.remove(...Object.keys(themes))
			document.documentElement.classList.add(theme)
			localStorage.setItem('theme', theme)
		}
	}, [theme])

	const changeTheme = (newTheme: ThemeName) => {
		if (themes && themes[newTheme]) {
			setTheme(newTheme)
		}
	}

	return { theme, changeTheme }
}
