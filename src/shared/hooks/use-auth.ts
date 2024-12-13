'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, login as loginAction, logout as logoutAction } from '@/app/actions/auth'
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

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser()
        if (userData) {
          setUser(userData as User)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const login = async (formData: FormData) => {
    try {
      const result = await loginAction(formData)
      if (result.error) {
        toast.error(result.error)
        return false
      }
      
      const userData = await getUser()
      if (userData) {
        setUser(userData as User)
        toast.success('Logged in successfully')
        router.push('/dashboard')
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      toast.error('An error occurred during login')
      return false
    }
  }

  const logout = async () => {
    try {
      await logoutAction()
      setUser(null)
      toast.success('Logged out successfully')
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Logout failed')
    }
  }

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  }
}

