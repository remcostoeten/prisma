import type { User } from '@/server/mutations/auth/user/types'
import { db } from '@/server/db'

export class UserService {
	async findById(id: number): Promise<User | null> {
		try {
			return await db.user.findUnique({
				where: { id },
				select: {
					id: true,
					email: true,
					firstName: true,
					lastName: true,
					name: true,
					image: true,
					provider: true,
					emailVerified: true
				}
			})
		} catch (error) {
			console.error('Find user error:', error)
			return null
		}
	}

	async updateUser(id: number, data: Partial<User>): Promise<User | null> {
		try {
			return await db.user.update({
				where: { id },
				data,
				select: {
					id: true,
					email: true,
					firstName: true,
					lastName: true,
					name: true,
					image: true,
					provider: true,
					emailVerified: true
				}
			})
		} catch (error) {
			console.error('Update user error:', error)
			return null
		}
	}

	async deleteUser(id: number): Promise<boolean> {
		try {
			await db.user.delete({ where: { id } })
			return true
		} catch (error) {
			console.error('Delete user error:', error)
			return false
		}
	}
}
