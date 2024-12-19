/**
 * @author Remcos Stoeten
 * @description Zustand store with persistence for managing authentication state, including user data, errors, and loading states.
 */

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Type definition for the User object.
 * @typedef {Object} User
 * @property {string} id - The unique identifier for the user.
 * @property {string} email - The user's email address.
 * @property {string} firstName - The user's first name.
 * @property {string} lastName - The user's last name.
 */
export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  // Add any other user properties
};

/**
 * Type definition for the response from authentication endpoints.
 * @typedef {Object} AuthResponse
 * @property {boolean} success - Indicates if the request was successful.
 * @property {string} [message] - Optional message describing the result.
 * @property {User} [user] - The user object if the request was successful.
 */
export type AuthResponse = {
  success: boolean;
  message?: string;
  user?: User;
};

/**
 * Type definition for login credentials.
 * @typedef {Object} LoginCredentials
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 * @property {boolean} [remember] - Whether to remember the user for future sessions.
 */
export type LoginCredentials = {
  email: string;
  password: string;
  remember?: boolean;
};

/**
 * Type definition for registration data.
 * @typedef {Object} RegisterData
 * @property {string} email - The user's email address.
 * @property {string} password - The user's password.
 * @property {string} firstName - The user's first name.
 * @property {string} lastName - The user's last name.
 */
export type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

/**
 * Type definition for authentication errors.
 * @typedef {Object} AuthError
 * @property {string} message - The error message.
 * @property {string} [code] - Optional error code.
 * @property {number} [status] - Optional HTTP status code associated with the error.
 */
export type AuthError = {
  message: string;
  code?: string;
  status?: number;
};

/**
 * Zustand state definition for authentication.
 * @typedef {Object} AuthState
 * @property {User | null} user - The currently authenticated user or null if not logged in.
 * @property {boolean} isLoading - Indicates if an authentication operation is in progress.
 * @property {AuthError | null} error - The current error, if any, or null.
 * @property {(user: User | null) => void} setUser - Updates the user object in the store.
 * @property {() => void} clearError - Clears any existing error in the store.
 */
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

/**
 * Zustand store for authentication state, with persistence.
 */
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      /**
       * The currently authenticated user or null if not logged in.
       */
      user: null,

      /**
       * Indicates if an authentication operation is in progress.
       */
      isLoading: false,

      /**
       * The current error, if any, or null.
       */
      error: null,

      /**
       * Updates the user object in the store and clears any existing error.
       * @param {User | null} user - The user object or null.
       */
      setUser: (user) => set({ user, error: null }),

      /**
       * Clears any existing error in the store.
       */
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
      }),
    }
  )
);

