'use client'

import { Theme } from '@/features/theme'
import { motion } from 'framer-motion'

type ThemePreviewProps = {
  theme: Theme
  isSelected: boolean
  onClickAction: () => void
}

export default function ThemePreview({ theme, isSelected, onClickAction }: ThemePreviewProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClickAction}
      className={`relative w-full aspect-[1/1] rounded-lg p-1.5 cursor-pointer ring-offset-background transition-all
        ${isSelected ? 'ring-2 ring-ring ring-offset-2' : 'hover:ring-1 hover:ring-ring hover:ring-offset-1'}`}
      style={{ background: theme.preview.background }}
    >
      <div className="h-full w-full space-y-2">
        <div className="h-2 w-8 rounded" style={{ background: theme.preview.accent }} />
        <div className="h-2 w-[80%] rounded" style={{ background: theme.preview.foreground, opacity: 0.4 }} />
        <div className="h-2 w-[60%] rounded" style={{ background: theme.preview.foreground, opacity: 0.4 }} />
      </div>
      <span
        className="absolute bottom-1.5 left-1.5 text-[11px] font-medium"
        style={{ color: theme.preview.foreground }}
      >
        {theme.name}
      </span>
      {isSelected && (
        <motion.div
          layoutId="selected-theme"
          className="absolute inset-0 rounded-lg ring-2 ring-ring ring-offset-2 ring-offset-background"
          initial={false}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  )
}
