'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, login, logout } from '@/server/mutations/auth'
import type { UserResponse } from '@/server/mutations/auth'
import { toast } from 'sonner'

export function useAuth() {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser()
        if (userData) {
          setUser(userData)
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

  const handleLogin = async (formData: FormData) => {
    try {
      const result = await login(formData)
      if (result.error) {
        toast.error(result.error)
        return false
      }
      
      const userData = await getUser()
      if (userData) {
        setUser(userData)
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

  const handleLogout = async () => {
    try {
      const result = await logout()
      if (!result.success) {
        toast.error(result.error || 'Logout failed')
        return
      }
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
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: !!user
  }
}

