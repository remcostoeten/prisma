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
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      {...props}
    >
      <Toaster />
      <TooltipProvider delayDuration={50}>
        <div className="min-h-screen bg-background text-foreground">
          {children}
          <SessionIndicator />
        </div>
      </TooltipProvider>
    </NextThemesProvider>
  )
}
