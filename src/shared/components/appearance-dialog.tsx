"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { X } from 'lucide-react'
import { Switch } from "@/shared/components/ui/switch"
import { Button } from "@/shared/components/ui/button"
import { Separator } from "@/shared/components/ui/separator"
import { themes, accentColors } from "../config/themes"
import { ThemePreview } from "./theme-preview"
import { ColorSwatch } from "./color-swatch"
import { saveThemePreferences, loadThemePreferences } from "../services/theme-service"

type AppearanceDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export function AppearanceDialog({ isOpen, onClose }: AppearanceDialogProps) {
  const { theme: currentTheme, setTheme } = useTheme()
  const [accentColor, setAccentColor] = useState(accentColors[0].value)
  const [sidebarTransparent, setSidebarTransparent] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isOpen) {
      const prefs = loadThemePreferences()
      setAccentColor(prefs.accentColor || accentColors[0].value)
      setSidebarTransparent(prefs.sidebarTransparent || false)
      setIsDirty(false)
    }
  }, [isOpen])

  if (!mounted) return null

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

  function handleSave() {
    saveThemePreferences({
      theme: currentTheme || 'dark',
      accentColor,
      sidebarTransparent
    })
    setIsDirty(false)
    onClose()
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const dialogVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-md bg-background rounded-xl p-6 shadow-2xl"
            variants={dialogVariants}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Appearance</h2>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-accent"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Theme</h3>
                <div className="grid grid-cols-3 gap-2">
                  {themes.map((theme) => (
                    <ThemePreview
                      key={theme.value}
                      theme={theme}
                      isSelected={currentTheme === theme.value}
                      onClick={() => handleThemeChange(theme.value)}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Accent Color</h3>
                <div className="flex flex-wrap gap-2">
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

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-medium">Transparent Sidebar</h3>
                  <p className="text-sm text-muted-foreground">
                    Make the sidebar background transparent
                  </p>
                </div>
                <Switch
                  checked={sidebarTransparent}
                  onCheckedChange={handleSidebarTransparencyChange}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 relative"
                onClick={handleSave}
                disabled={!isDirty}
              >
                <AnimatePresence>
                  {isDirty && (
                    <motion.span
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-foreground"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    />
                  )}
                </AnimatePresence>
                Save Changes
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

