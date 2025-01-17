'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Github } from 'lucide-react'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage, BreadcrumbLink, BreadcrumbSeparator } from '@/shared/components/ui'
import { NotificationsPopover } from './header/notifications-popover'
import { WorkspaceSwitcher } from './header/workspace-switcher'
import { getUser } from '@/server/mutations/auth'
import { Button } from '@/shared/components/ui/button'

interface Breadcrumb {
  href: string
  label: string
}

interface User {
  id: number
  email: string
  firstName?: string
  lastName?: string
  name?: string
  image?: string
}

interface TopHeaderProps {
  initialBreadcrumbs?: Breadcrumb[]
  onBreadcrumbChange?: (breadcrumbs: Breadcrumb[]) => void
}

export function TopHeader({ initialBreadcrumbs = [], onBreadcrumbChange }: TopHeaderProps) {
  const [breadcrumbs] = useState(initialBreadcrumbs)
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser()
        setUser(userData as User)
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (onBreadcrumbChange) {
      onBreadcrumbChange(breadcrumbs)
    }
  }, [breadcrumbs, onBreadcrumbChange])

  if (pathname === '/') {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1f1f1f] bg-[#0A0A0A]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0A]/75">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {user && <WorkspaceSwitcher />}
          {user && <div className="h-5 w-px bg-[#1f1f1f]" />}
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.length > 0 ? (
                breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={crumb.href}>
                    <BreadcrumbItem>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage className="text-neutral-200">{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={crumb.href} className="text-neutral-400 hover:text-emerald-400">
                          {crumb.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator className="text-neutral-600" />}
                  </React.Fragment>
                ))
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-neutral-200">Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-emerald-500/5 hover:text-emerald-400 transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
          {user ? (
            <NotificationsPopover />
          ) : (
            <>
              <Button asChild variant="ghost" className="text-neutral-400 hover:text-emerald-400">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="ghost" className="text-neutral-400 hover:text-emerald-400">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

