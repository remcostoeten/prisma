'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getUser } from '@/app/actions/auth'
import { logout as logoutMutation } from '@/server/mutations/logout'
import { useRouter } from 'next/navigation'

type User = {
  id: number
  email: string
  firstName: string | null
  lastName: string | null
  name: string | null
  image: string | null
  provider: string | null
}

type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
  logout: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser()
        if (userData) {
          setUser(userData)
        } else {
          setUser(null)
          // If we're on a protected route and there's no user, redirect to login
          if (window.location.pathname.startsWith('/dashboard')) {
            router.push('/login')
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const logout = async () => {
    try {
      const result = await logoutMutation()

      if (!result.success) {
        throw new Error(result.error || 'Logout failed')
      }

      setUser(null)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  const value = {
    user,
    setUser,
    isLoading,
    logout,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}