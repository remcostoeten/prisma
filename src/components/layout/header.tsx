'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, logout } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from 'sonner'

type User = {
  id: number
  email: string
  firstName: string | null
  lastName: string | null
  name: string | null
  image: string | null
  provider: string | null
}

export function Header() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser()
        setUser(userData as User | null)
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      setUser(null)
      toast.success('Logged out successfully')
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Logout failed')
    }
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Auth Project
        </Link>
        <div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={user.image || undefined} 
                      alt={user.name || undefined} 
                    />
                    <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-4">
              <Link href="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
              <Link href="/register" className="text-blue-600 hover:text-blue-800">Register</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

