import type { User } from '../auth/user/types'

export type LoginCredentials = {
    email: string
    password: string
    remember?: boolean
}

export type LoginResponse = {
    success: boolean
    error?: string
    user?: User
}

export type LoginError = {
    message: string
    code?: string
    status?: number
} 
