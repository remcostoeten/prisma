'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUser } from '../actions/auth'
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

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await getUser()
        if (userData) {
          setUser(userData)
        } else {
          toast.error('Please log in to access the dashboard')
          router.push('/login')
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        toast.error('An error occurred while fetching user data')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Welcome to your Dashboard</h1>
        <p className="mb-2">Name: {user.name}</p>
        <p className="mb-2">Email: {user.email}</p>
        <p className="mb-4">Provider: {user.provider || 'Email/Password'}</p>
      </div>
    </div>
  )
}

