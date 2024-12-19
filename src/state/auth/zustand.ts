'use client'

/**
 * @author Remco Stoeten
 * @description Zustand-based authentication state management with persistence. Provides user authentication state,
 * loading states, error handling, and authentication actions like login, logout, and user refresh.
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { logout as logoutMutation } from '@/server/mutations/auth'
import getUser from '@/server/queries/get-user/get-user'
import type { AuthContextType, User } from '@/core/types/auth'
import { toast } from 'sonner'

/**
 * Zustand store for user authentication
 * Includes persistence middleware for maintaining state across page refreshes
 */
export const useUserStore = create<AuthContextType>()(
  persist(
    (set) => ({
      // State
      user: null,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user: User | null): void => 
        set({ user, error: null }),
      
      clearError: (): void => 
        set({ error: null }),

      logout: async (): Promise<void> => {
        try {
          set({ isLoading: true })
          const response = await logoutMutation()

          if (response.success) {
            set({ user: null })
            toast.success('Successfully logged out')
          } else {
            set({ 
              error: {
                message: 'Failed to logout',
                code: 'LOGOUT_ERROR'
              }
            })
            toast.error('Failed to logout')
          }
        } catch (error) {
          console.error('Logout error:', error)
          set({ 
            error: {
              message: 'Failed to logout',
              code: 'LOGOUT_ERROR'
            }
          })
          toast.error('Failed to logout')
        } finally {
          set({ isLoading: false })
        }
      },

      refreshUser: async (): Promise<void> => {
        try {
          set({ isLoading: true })
          const userData = await getUser()
          set({ user: userData, error: null })
        } catch (error) {
          console.error('Failed to refresh user:', error)
          set({ 
            user: null,
            error: {
              message: 'Failed to refresh user data',
              code: 'REFRESH_ERROR'
            }
          })
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: AuthContextType) => ({
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
      }),
    }
  )
)

/**
 * Hook to access user authentication state and actions
 * Provides a consistent interface matching the Context API implementation
 * @returns {AuthContextType} User state and authentication actions
 */
export function useUser(): AuthContextType {
  const store = useUserStore()
  return {
    user: store.user,
    setUser: store.setUser,
    isLoading: store.isLoading,
    error: store.error,
    clearError: store.clearError,
    logout: store.logout,
    refreshUser: store.refreshUser,
  }
} 
