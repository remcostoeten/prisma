
'use client'

import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { themes, ThemeName } from './types'
import { useTheme } from 'next-themes'

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Select value={theme} onValueChange={(value: ThemeName) => setTheme(value as ThemeName)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(themes).map(([key, themeValue]) => (
          <SelectItem key={key} value={key}>
            {themeValue.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
