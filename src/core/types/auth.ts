/**
 * @author Remco Stoeten
 * @description Type definitions for authentication state management
 */

/**
 * Base user type containing all possible user properties
 */
export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

/**
 * Response type for authentication endpoints
 */
export type AuthResponse = {
  success: boolean;
  user?: User;
  error?: string;
};

/**
 * Login credentials type
 */
export type LoginCredentials = {
  email: string;
  password: string;
  remember?: boolean;
};

/**
 * Registration data type
 */
export type RegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

/**
 * Authentication error type
 */
export type AuthError = {
  message: string;
  code: string;
};

/**
 * Authentication state type
 */
export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: AuthError | null;
};

/**
 * Authentication actions type
 */
export type AuthActions = {
  setUser: (user: User | null) => void;
  clearError: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

/**
 * Combined type for auth context/store
 */
export type AuthContextType = AuthState & AuthActions; 
