'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getUser } from '@/app/actions/auth'

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

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser()
        if (userData) {
          setUser(userData)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  const logout = async () => {
    setUser(null)
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