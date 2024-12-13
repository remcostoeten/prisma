'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { register } from '../actions/auth'
import { toast } from 'sonner'

export default function Register() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      const result = await register(formData)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Registration successful')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Register</h1>
        </div>
        <form action={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-muted-foreground">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-muted-foreground">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:text-primary/80">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

