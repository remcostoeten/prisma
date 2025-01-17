'use cliet'

import React from 'react'
import { Dialog, DialogContent } from "@/shared/components/ui/dialog"
import { AnimatePresence, motion } from 'framer-motion'

interface AnimatedDialogProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function AnimatedDialog({ isOpen, onClose, children }: AnimatedDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[425px] bg-transparent border-0 p-0 shadow-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{
                duration: 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {children}
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}


