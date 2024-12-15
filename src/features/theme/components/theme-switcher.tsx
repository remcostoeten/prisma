import * as React from "react"
import { Check, ChevronDown } from 'lucide-react'

import { cn } from "helpers"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,Popover,
  PopoverContent,
  PopoverTrigger,
  Button
} from "ui"
import { themes, type ThemeName } from "@/features/theme/config/theme"

interface ThemeSwitcherProps {
  theme: ThemeName
  changeTheme: (theme: ThemeName) => void
}

export function ThemeSwitcher({ theme, changeTheme }: ThemeSwitcherProps) {
  const [open, setOpen] = React.useState(false)

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
            {Object.entries(themes).map(([key, themeValue]) => (
              <CommandItem
                key={key}
                onSelect={() => {
                  changeTheme(key as ThemeName)
                  setOpen(false)
                }}
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


