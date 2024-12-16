'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { logout as logoutMutation } from '@/server/mutations/auth'
import type { User } from '@/shared/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/shared/hooks/use-auth'
import { getUser } from '@/server/queries'

type UserContextType = {
	user: User | null
	setUser: (user: User | null) => void
	isLoading: boolean
	logout: () => Promise<void>
	refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()
	const { setUser: setAuthUser } = useAuth()

	const updateUserState = useCallback((newUser: User | null) => {
		setUser(newUser)
		setAuthUser(newUser)
	}, [setAuthUser])

	const refreshUser = useCallback(async () => {
		try {
			setIsLoading(true)
			const userData = await getUser()
			updateUserState(userData)
		} catch (error) {
			console.error('Failed to refresh user:', error)
			updateUserState(null)
		} finally {
			setIsLoading(false)
		}
	}, [updateUserState])

	const logout = useCallback(async () => {
		try {
			setIsLoading(true)
			const response = await logoutMutation()

			if (response.success) {
				updateUserState(null)
				toast.success('Successfully logged out')
				router.replace('/login')
			} else {
				toast.error('Failed to logout')
			}
		} catch (error) {
			console.error('Logout error:', error)
			toast.error('Failed to logout')
		} finally {
			setIsLoading(false)
		}
	}, [router, updateUserState])

	// Initial user fetch
	useEffect(() => {
		refreshUser()
	}, [refreshUser])

	// Refresh user on route change
	useEffect(() => {
		const handleRouteChange = () => {
			refreshUser()
		}

		window.addEventListener('popstate', handleRouteChange)
		return () => {
			window.removeEventListener('popstate', handleRouteChange)
		}
	}, [refreshUser])

	return (
		<UserContext.Provider
			value={{
				user,
				setUser: updateUserState,
				isLoading,
				logout,
				refreshUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export function useUser() {
	const context = useContext(UserContext)
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider')
	}
	return context
}
