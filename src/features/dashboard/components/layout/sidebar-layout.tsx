'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Command, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from "@/shared/components/ui/input"
import { getRoutes, Route, searchRoutes } from '@/services'
import { useKeyboardShortcut } from '@/shared/hooks'
import { AnimatedDialog } from '@/shared/components/common/animated-dialog'
import { UserMenuPopover } from '@/features/auth/components/user-menu'

export function SidebarNav() {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Route[]>([])
  const navRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setSearchResults(searchRoutes(query))
  }, [])

  const handleKeyboardShortcut = useCallback((index: number) => {
    if (index < searchResults.length) {
      router.push(searchResults[index].href)
      setIsDialogOpen(false)
    }
  }, [searchResults, router])

  useKeyboardShortcut('/', (event) => {
    event.preventDefault()
    setIsDialogOpen(true)
  })

  useKeyboardShortcut('1', (event) => {
    event.preventDefault()
    handleKeyboardShortcut(0)
  })

  useKeyboardShortcut('2', (event) => {
    event.preventDefault()
    handleKeyboardShortcut(1)
  })

  // Add more shortcuts as needed

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
      const index = numbers.indexOf(event.key)
      if (index !== -1 && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        handleKeyboardShortcut(index)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyboardShortcut])

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          'relative flex h-screen flex-col justify-between bg-[#0A0A0A] border-r border-[#f0f0f5] border-opacity-20 py-2 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
          isCollapsed ? 'w-14 hover:w-52' : 'w-52'
        )}
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
      >
        <div className="flex flex-col gap-1 z-10">
          <Link href="/dashboard" className="mx-2 mb-2 flex h-10 w-10 items-center justify-center">
            <img src="https://supabase.com/dashboard/img/supabase-logo.svg" alt="Supabase" className="h-6 w-6" />
          </Link>

          <div className="flex flex-col gap-1">
            {getRoutes().map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'group relative flex h-10 w-full items-center px-2 mx-1 transition-colors duration-200',
                  'text-neutral-400 hover:text-emerald-400 hover:bg-emerald-500/5',
                  pathname === route.href && 'text-emerald-400 bg-emerald-500/5'
                )}
              >
                <span className="flex h-10 w-10 items-center justify-center">
                  {React.createElement(route.icon, { size: 20 })}
                </span>
                <span
                  className={cn(
                    "ml-2 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                    isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
                  )}
                >
                  {route.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 px-2 z-10 border-t border-[#f0f0f5] border-opacity-20 pt-2">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="group relative flex h-10 w-full items-center text-neutral-400 transition-all duration-300 ease-in-out hover:text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center">
              <Command size={20} />
            </span>
            <span
              className={cn(
                "ml-2 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
              )}
            >
              Search
            </span>
          </button>

          <UserMenuPopover
            username="remcostoeten"
            email="remcostoeten..hotm..."
            avatarSeed="remcostoeten"
            plan="Pro Plan"
            isCollapsed={isCollapsed}
          />
        </div>
      </nav>

      <AnimatedDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <div className="p-4 bg-[#0A0A0A] rounded-lg">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-[#1f1f1f] border-[#f0f0f5] border-opacity-20 text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
              autoFocus
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <div className="mt-4 space-y-2">
            {searchResults.slice(0, 9).map((route, index) => (
              <Link
                key={route.href}
                href={route.href}
                className="flex items-center px-2 py-1 rounded-md text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors duration-200"
                onClick={() => setIsDialogOpen(false)}
              >
                <span className="mr-2">{React.createElement(route.icon, { size: 16 })}</span>
                {route.label}
                <span className="ml-auto text-xs text-gray-500">Ctrl {index + 1}</span>
              </Link>
            ))}
          </div>
          {searchResults.length === 0 && searchQuery && (
            <p className="text-sm text-gray-500 mt-2">No results found</p>
          )}
          <p className="mt-4 text-xs text-gray-500">
            Press <kbd className="px-1 py-0.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-md backdrop-blur-sm shadow-sm">ESC</kbd> to close
          </p>
        </div>
      </AnimatedDialog>
    </>
  )
}

