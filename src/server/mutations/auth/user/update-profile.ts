'use server'

import { db } from '@/server/db'
import { getUser } from '@/server/queries/get-user'

interface UpdateProfileData {
    firstName?: string
    lastName?: string
    name?: string
    email: string
}

export async function updateProfile(data: UpdateProfileData) {
    const currentUser = await getUser()

    if (!currentUser) {
        throw new Error('Not authenticated')
    }

    try {
        const updatedUser = await db.user.update({
            where: { id: currentUser.id },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                name: data.name,
                email: data.email,
            },
        })

        return {
            success: true,
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                name: updatedUser.name,
                image: updatedUser.image,
                provider: updatedUser.provider,
                emailVerified: updatedUser.emailVerified
            }
        }
    } catch (error) {
        console.error('Update profile error:', error)
        throw new Error('Failed to update profile')
    }
}
