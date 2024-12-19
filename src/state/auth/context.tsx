'use client'

/**
 * @author Remco Stoeten
 * @description React Context-based authentication state management. Provides user authentication state,
 * loading states, error handling, and authentication actions like login, logout, and user refresh.
 */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { logout as logoutMutation } from '@/server/mutations/auth'
import getUser from '@/server/queries/get-user/get-user'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import type { AuthContextType, User, AuthError } from '@/core/types/auth'

/**
 * Props type for the UserProvider component
 */
type UserProviderProps = {
  children: ReactNode;
};

/**
 * React Context instance for user authentication
 * @private Internal use only - use useUser hook instead
 */
const UserContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Provider component for user authentication state
 * Manages user state, loading states, and authentication actions
 */
export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<AuthError | null>(null)
  const router = useRouter()

  /**
   * Clears any existing authentication errors
   */
  const clearError = useCallback((): void => {
    setError(null)
  }, [])

  /**
   * Updates the user state and clears any existing errors
   */
  const updateUserState = useCallback((newUser: User | null): void => {
    setUser(newUser)
    clearError()
  }, [clearError])

  /**
   * Refreshes the current user's data from the server
   * Updates the user state and handles any errors
   */
  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      const userData = await getUser()
      updateUserState(userData)
    } catch (error) {
      console.error('Failed to refresh user:', error)
      setError({
        message: 'Failed to refresh user data',
        code: 'REFRESH_ERROR'
      })
      updateUserState(null)
    } finally {
      setIsLoading(false)
    }
  }, [updateUserState])

  /**
   * Logs out the current user
   * Clears the user state and redirects to login page
   */
  const logout = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      const response = await logoutMutation()

      if (response.success) {
        updateUserState(null)
        toast.success('Successfully logged out')
        router.replace('/login')
      } else {
        setError({
          message: 'Failed to logout',
          code: 'LOGOUT_ERROR'
        })
        toast.error('Failed to logout')
      }
    } catch (error) {
      console.error('Logout error:', error)
      setError({
        message: 'Failed to logout',
        code: 'LOGOUT_ERROR'
      })
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
    const handleRouteChange = (): void => {
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
        isLoading,
        error,
        setUser: updateUserState,
        clearError,
        logout,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

/**
 * Hook to access user authentication state and actions
 * Must be used within a UserProvider component
 * @throws {Error} If used outside of UserProvider
 * @returns {AuthContextType} User state and authentication actions
 */
export function useUser(): AuthContextType {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
} 
