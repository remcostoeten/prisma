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
  name?: string;
  image?: string | null;
  provider?: string;
};

/**
 * Response type for authentication endpoints
 */
export type AuthResponse = {
  success: boolean;
  message?: string;
  user?: User;
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
  code?: string;
  status?: number;
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
