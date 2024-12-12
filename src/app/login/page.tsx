'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { login, googleLogin, githubLogin } from '../actions/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { toast } from 'sonner'

export default function Login() {
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      toast.error(error)
    }
  }, [searchParams])

  async function handleSubmit(formData: FormData) {
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
      toast.error(result.error)
    } else if (result?.success) {
      toast.success('Logged in successfully')
      router.push('/dashboard')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="mb-4 text-2xl font-bold text-center">Login</h1>
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
        <div className="mt-4">
          <p className="text-center mb-2">Or login with:</p>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => googleLogin()} className="bg-red-500 hover:bg-red-600">
              Google
            </Button>
            <Button onClick={() => githubLogin()} className="bg-gray-800 hover:bg-gray-900">
              GitHub
            </Button>
          </div>
        </div>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        <p className="mt-4 text-center">
          Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}

