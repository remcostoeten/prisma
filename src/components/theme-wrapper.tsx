"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from "sonner"
import { TooltipProvider } from "@/shared/components/ui/tooltip"
import SessionIndicator from "@/features/dev-tools/session-indicator"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>
    <Toaster/>
    <TooltipProvider delayDuration={50}>
      {children}
      <SessionIndicator/>
    </TooltipProvider>
    </NextThemesProvider>
}
