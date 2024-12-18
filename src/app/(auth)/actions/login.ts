'use server'

import { login } from '@/server/mutations/login/login'
import type { LoginResponse } from '@/server/mutations/login/types'

export type LoginActionResponse = LoginResponse

export async function loginAction(formData: FormData): Promise<LoginActionResponse> {
	return login(formData)
}
