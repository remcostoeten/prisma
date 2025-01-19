import { PrismaClient } from '@prisma/client'

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined
}

const db =
	globalThis.prisma ||
	new PrismaClient({
		log:
			process.env.NODE_ENV === 'development'
				? ['query', 'error', 'warn']
				: ['error']
	})

if (process.env.NODE_ENV !== 'production') {
	globalThis.prisma = db
}

export { db }
export default db
