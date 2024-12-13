'use server'

import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import prisma from '@/server/db'
import type { UserResponse } from './types.ts' 