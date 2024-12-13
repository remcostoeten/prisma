'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/theme/logo'
import { useUser } from '@/contexts/user-context'
import UserMenu from '@/components/layout/header/user-menu'
import { Button } from '@/shared/components/ui/button'
export default function Nav() {
  const pathname = usePathname()
  const { user, isLoading } = useUser()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isAuthPage = pathname === '/login' || pathname === '/register'

  if (!mounted || isAuthPage || isLoading) {
    return null
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 px-6">
      <div className="flex items-center gap-6">
        <Link href={user ? "/dashboard" : "/"} className="transition-opacity hover:opacity-80">
          <Logo hasLink={true} />
        </Link>
        <Link 
          href="/docs" 
          className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          Documentation
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <UserMenu />
        ) : (
          <Button
            variant="ghost"
            className="text-sm text-zinc-400 hover:text-zinc-100"
            asChild
          >
            <Link href="/login">Sign in</Link>
          </Button>
        )}
      </div>
    </header>
  )
}

