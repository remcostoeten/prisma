"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { X, Monitor, Moon, Sun, Palette } from 'lucide-react'
import { Switch } from "@/shared/components/ui/switch"
import { Button } from "@/shared/components/ui/button"
import { Separator } from "@/shared/components/ui/separator"
import { themes, accentColors } from "../config/themes"
import { ColorSwatch } from "./color-swatch"
import { saveThemePreferences, loadThemePreferences } from "../services/theme-service"
import { cn } from '@/shared/helpers/utils'
import { Skeleton } from "@/shared/components/ui/skeleton"

type AppearanceDialogProps = {
  isOpen: boolean
  onCloseAction: () => void
}

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
  rose: Palette,
  green: Palette,
  blue: Palette,
} as const

export function AppearanceDialog({ isOpen, onCloseAction }: AppearanceDialogProps) {
  const { theme: currentTheme, setTheme, resolvedTheme } = useTheme()
  const [accentColor, setAccentColor] = useState('#2563eb')
  const [sidebarTransparent, setSidebarTransparent] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isOpen) {
      const prefs = loadThemePreferences()
      setAccentColor(prefs.accentColor || '#2563eb')
      setSidebarTransparent(prefs.sidebarTransparent || false)
      setIsDirty(false)
    }
  }, [isOpen])

  if (!mounted) return null

  const actualTheme = currentTheme === 'system' ? resolvedTheme : currentTheme

  function handleThemeChange(value: string) {
    setTheme(value)
    setIsDirty(true)
  }

  function handleAccentColorChange(value: string) {
    setAccentColor(value)
    setIsDirty(true)
  }

  function handleSidebarTransparencyChange(value: boolean) {
    setSidebarTransparent(value)
    setIsDirty(true)
  }

  function handleClose() {
    if (typeof onCloseAction === 'function') {
      onCloseAction()
    }
  }

  function handleSave() {
    saveThemePreferences({
      theme: currentTheme || 'dark',
      accentColor,
      sidebarTransparent
    })
    setIsDirty(false)
    handleClose()
  }

  const getThemeGradient = (theme: string) => {
    switch (theme) {
      case 'rose':
        return 'from-rose-500 to-pink-500'
      case 'green':
        return 'from-emerald-500 to-green-500'
      case 'blue':
        return 'from-blue-500 to-indigo-500'
      case 'light':
        return 'from-orange-500 to-amber-500'
      case 'dark':
        return 'from-slate-700 to-slate-900'
      default:
        return 'from-indigo-500 to-purple-500'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${actualTheme === 'dark' ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-sm`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className={`relative w-full max-w-md ${actualTheme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-white'} rounded-xl shadow-2xl border ${actualTheme === 'dark' ? 'border-[#2f2f2f]' : 'border-[#e0e0e0]'} overflow-hidden`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-6 py-4 border-b ${actualTheme === 'dark' ? 'border-[#2f2f2f]' : 'border-[#e0e0e0]'}`}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-full bg-gradient-to-br flex items-center justify-center",
                  getThemeGradient(actualTheme || 'dark')
                )}>
                  {(() => {
                    const Icon = themeIcons[actualTheme as keyof typeof themeIcons] || Sun
                    return <Icon className="w-4 h-4 text-white" />
                  })()}
                </div>
                <div>
                  <h2 className="text-base font-medium text-white">Appearance</h2>
                  <p className="text-xs text-white/50">Customize your experience</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white/50 hover:text-white hover:bg-white/10"
                onClick={handleClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className={`p-6 space-y-6 ${actualTheme === 'dark' ? 'text-white' : 'text-black'}`}>
              {/* Theme Selection */}
              <div>
                <h3 className={`text-sm font-medium ${actualTheme === 'dark' ? 'text-white/90' : 'text-black/90'} mb-4`}>Theme</h3>
                <div className="grid grid-cols-2 gap-4">
                  {themes.length === 0 ? (
                    <Skeleton className="h-12 w-full rounded-lg" />
                  ) : (
                    themes.map((theme) => (
                      <button
                        key={theme.value}
                        onClick={() => handleThemeChange(theme.value)}
                        className={cn(
                          'flex flex-col items-center p-4 rounded-lg border transition-all',
                          'hover:border-blue-500 hover:bg-blue-100',
                          currentTheme === theme.value
                            ? 'border-blue-500 bg-blue-100'
                            : 'border-transparent bg-transparent'
                        )}
                      >
                        <div className={`h-16 w-16 rounded-lg ${getThemeGradient(theme.value)}`}>
                          {/* Optional: Add an icon or representation of the theme */}
                        </div>
                        <span className={`mt-2 text-sm ${currentTheme === theme.value ? 'text-blue-600' : 'text-gray-600'}`}>
                          {theme.name}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>

              <Separator className="bg-[#2f2f2f]" />

              {/* Accent Color */}
              <div>
                <h3 className={`text-sm font-medium ${actualTheme === 'dark' ? 'text-white/90' : 'text-black/90'} mb-4`}>Accent Color</h3>
                <div className="grid grid-cols-6 gap-2">
                  {accentColors.map((color) => (
                    <ColorSwatch
                      key={color.value}
                      color={color.value}
                      isSelected={accentColor === color.value}
                      onClick={() => handleAccentColorChange(color.value)}
                    />
                  ))}
                </div>
              </div>

              <Separator className="bg-[#2f2f2f]" />

              {/* Sidebar Transparency */}
              <div className={`flex items-center justify-between ${actualTheme === 'dark' ? 'text-white' : 'text-black'}`}>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-medium text-white/90">Transparent Sidebar</h3>
                  <p className="text-xs text-white/50">
                    Make the sidebar background transparent
                  </p>
                </div>
                <Switch
                  checked={sidebarTransparent}
                  onCheckedChange={handleSidebarTransparencyChange}
                  className={`data-[state=checked]:bg-indigo-500 ${actualTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}
                />
              </div>
            </div>

            {/* Footer */}
            <div className={`flex gap-2 p-6 border-t ${actualTheme === 'dark' ? 'border-[#2f2f2f]' : 'border-[#e0e0e0]'}`}>
              <Button
                variant="ghost"
                className={`flex-1 h-9 text-sm font-medium ${actualTheme === 'dark' ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-black/80 hover:text-black hover:bg-gray-200'}`}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                className={`flex-1 h-9 text-sm font-medium ${actualTheme === 'dark' ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                onClick={handleSave}
                disabled={!isDirty}
                style={{ backgroundColor: accentColor }}
              >
                Save Changes
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

