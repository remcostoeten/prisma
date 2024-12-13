import { PrismaClient } from '@prisma/client'
import type { OAuthProfile } from '@/lib/auth/types'

const prisma = new PrismaClient()

export class OAuthService {
  async findOrCreateUser(profile: OAuthProfile) {
    let user = await prisma.user.findUnique({ 
      where: { email: profile.email } 
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: profile.email,
          name: profile.name,
          firstName: profile.firstName,
          lastName: profile.lastName,
          image: profile.image,
          provider: profile.provider,
          emailVerified: new Date(),
        },
      })
    }

    return user
  }
}