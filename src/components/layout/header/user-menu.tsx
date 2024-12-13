'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Settings, UserCircle, ChevronDown } from 'lucide-react'
import { useUser } from '@/contexts/user-context'
import { cn } from '@/shared/helpers/utils'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'ui'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { user, logout } = useUser()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (!user) {
    return null
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          {user.image ? (
            <img 
              src={user.image} 
              alt={user.name || 'User'} 
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <UserCircle className="h-4 w-4 text-zinc-900 dark:text-zinc-400" />
            </span>
          )}
          <ChevronDown className={cn(
            "ml-2 h-4 w-4 text-zinc-500 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56"
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-zinc-600 dark:text-zinc-400">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={() => router.push('/settings')}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-red-600 dark:text-red-400"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

