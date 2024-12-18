'use client'

import * as React from "react"
import { Check, ChevronDown } from 'lucide-react'
import { cn } from "helpers"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button
} from "ui"
import { themes, type ThemeName } from "@/features/theme/config/theme"

type ThemeSwitcherProps = {
  theme: ThemeName
  changeTheme: (theme: ThemeName) => void
  changeAccentColor: (color: string) => void
}

export function ThemeSwitcher({ theme, changeTheme, changeAccentColor }: ThemeSwitcherProps) {
  const [open, setOpen] = React.useState(false)

  const handleThemeSelect = (selectedTheme: ThemeName) => {
    changeTheme(selectedTheme)
    const selectedAccentColor = themes[selectedTheme].accent // Assuming each theme has an accent property
    changeAccentColor(selectedAccentColor)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {theme}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search theme..." />
          <CommandEmpty>No theme found.</CommandEmpty>
          <CommandGroup>
            {themes && Object.entries(themes).map(([key, themeValue]) => (
              <CommandItem
                key={key}
                onSelect={() => handleThemeSelect(key as ThemeName)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    theme === key ? "opacity-100" : "opacity-0"
                  )}
                />
                {themeValue.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
