import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

export async function rateLimit(
  request: NextRequest,
  { limit = 10, window = '1m' }: { limit?: number; window?: string } = {}
) {
  const ip = request.ip || 'anonymous'
  const key = `rate-limit:${ip}`

  try {
    const result = await redis.incr(key)
    
    if (result === 1) {
      await redis.expire(key, parseInt(window) * 60)
    }

    if (result > limit) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }

    return null
  } catch (error) {
    console.error('Rate limit error:', error)
    // Continue without rate limiting on error
    return null
  }
}