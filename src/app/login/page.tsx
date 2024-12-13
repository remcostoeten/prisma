'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '../actions/auth'
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import Link from 'next/link'
import { toast } from 'sonner'
import { useUser } from '@/contexts/user-context'

export default function Login() {
  const [error, setError] = useState('')
  const router = useRouter()
  const { setUser } = useUser()

  async function handleSubmit(formData: FormData) {
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
      toast.error(result.error)
    } else if (result?.success && result.user) {
      setUser(result.user)
      toast.success('Logged in successfully')
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="p-8 bg-card rounded-lg border border-border shadow-lg w-96">
        <h1 className="mb-4 text-2xl font-bold text-center text-foreground">Login</h1>
        <form action={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" required />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password" required />
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </form>
        {error && <p className="mt-4 text-destructive text-center">{error}</p>}
        <p className="mt-4 text-center text-muted-foreground">
          Don&apos;t have an account? <Link href="/register" className="text-primary hover:text-primary/80 font-semibold">Register</Link>
        </p>
      </div>
    </div>
  )
}