'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { register } from '../actions/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { toast } from 'sonner'

export default function Register() {
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const result = await register(formData)
    if (result?.error) {
      setError(result.error)
      toast.error(result.error)
    } else if (result?.success) {
      toast.success('Registered successfully')
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="mb-4 text-2xl font-bold text-center">Register</h1>
        <form action={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" required />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password" required />
          </div>
          <Button type="submit" className="w-full">Register</Button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        <p className="mt-4 text-center">
          Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

