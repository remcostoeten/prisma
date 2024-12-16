import { type PrismaClient } from '@prisma/client'
import { PrismaClient as PClient } from '@prisma/client'

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined
}

const prisma = globalThis.prisma || new PClient({
	log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
	globalThis.prisma = prisma
}

export { prisma as db }
export default prisma
