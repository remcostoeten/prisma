'use client'
  
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { register } from '../actions/auth'
import { toast } from 'sonner'
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { useUser } from '@/contexts/user-context'

export default function Register() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { setUser } = useUser()

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      const result = await register(formData)
      if (result.error) {
        toast.error(result.error)
      } else if (result.success && result.user) {
        setUser(result.user)
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
      <div className="w-full max-w-md space-y-6 rounded-lg border border-border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Create an Account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your details to get started
          </p>
        </div>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-6"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:text-primary/80">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}