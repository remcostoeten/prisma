'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getUser, logout } from '@/server/mutations/auth'
import type { UserResponse } from '@/server/mutations/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type UserContextType = {
	user: UserResponse | null
	setUser: (user: UserResponse | null) => void
	isLoading: boolean
	logout: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export default function UserProvider({
	children
}: {
	children: React.ReactNode
}) {
	const [user, setUser] = useState<UserResponse | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		async function fetchUser() {
			try {
				const userData = await getUser()
				if (userData) {
					setUser(userData)
				} else {
					setUser(null)
					// If we're on a protected route and there's no user, redirect to login
					if (window.location.pathname.startsWith('/dashboard')) {
						router.push('/login')
					}
				}
			} catch (error) {
				console.error('Error fetching user:', error)
				setUser(null)
			} finally {
				setIsLoading(false)
			}
		}

		fetchUser()
	}, [router])

	const handleLogout = async () => {
		try {
			const result = await logout()

			if (!result.success) {
				toast.error(result.error || 'Logout failed')
				throw new Error(result.error || 'Logout failed')
			}

			setUser(null)
			toast.success('Successfully logged out')
			router.push('/login')
		} catch (error) {
			console.error('Logout error:', error)
			toast.error('An error occurred during logout')
			throw error
		}
	}

	const value = {
		user,
		setUser,
		isLoading,
		logout: handleLogout
	}

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
	const context = useContext(UserContext)
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider')
	}
	return context
}
