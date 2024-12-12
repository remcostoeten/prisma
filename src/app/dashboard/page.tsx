import { getUser, logout } from '../actions/auth'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default async function Dashboard() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Welcome to your Dashboard</h1>
        {user.image && (
          <img src={user.image} alt="Profile" className="w-20 h-20 rounded-full mb-4" />
        )}
        <p className="mb-2">Name: {user.name || 'Not provided'}</p>
        <p className="mb-2">Email: {user.email}</p>
        <p className="mb-4">Login Provider: {user.provider || 'Email/Password'}</p>
        <form action={logout}>
          <Button type="submit">Logout</Button>
        </form>
      </div>
    </div>
  )
}


