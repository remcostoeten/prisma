/**
       * @author Remcos Stoeten
       * @description Zustand store for managing user state, including login, logout, and user refresh functionality.
       */

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUser, logout as logoutMutation } from '@/server/mutations/auth';
import type { User, AuthState, AuthActions } from '@/core/types/auth';
import { toast } from 'sonner';

type UserStore = AuthState & AuthActions;

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      isLoading: false,
      error: null,

      // Actions
      setUser: (user) => set({ user, error: null }),
      
      clearError: () => set({ error: null }),

      logout: async () => {
        try {
          set({ isLoading: true });
          const response = await logoutMutation();

          if (response.success) {
            set({ user: null });
            toast.success('Successfully logged out');
            // Navigation should be handled by the component
          } else {
            set({ 
              error: {
                message: 'Failed to logout',
                code: 'LOGOUT_ERROR'
              }
            });
            toast.error('Failed to logout');
          }
        } catch (error) {
          console.error('Logout error:', error);
          set({ 
            error: {
              message: 'Failed to logout',
              code: 'LOGOUT_ERROR'
            }
          });
          toast.error('Failed to logout');
        } finally {
          set({ isLoading: false });
        }
      },

      refreshUser: async () => {
        try {
          set({ isLoading: true });
          const userData = await getUser();
          set({ user: userData, error: null });
        } catch (error) {
          console.error('Failed to refresh user:', error);
          set({ 
            user: null,
            error: {
              message: 'Failed to refresh user data',
              code: 'REFRESH_ERROR'
            }
          });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);

/**
 * Custom hook to use the user store.
 * Provides user state and actions as a convenient hook.
 * @returns {UserStore} - The user store object.
 */
export const useUser = () => {
  const store = useUserStore();
  return {
    user: store.user,
    setUser: store.setUser,
    isLoading: store.isLoading,
    logout: store.logout,
    refreshUser: store.refreshUser,
  };
};



