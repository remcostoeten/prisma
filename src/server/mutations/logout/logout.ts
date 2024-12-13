'use server'

import { cookies } from 'next/headers'
import prisma from '@/server/db'
import type { LogoutResponse } from './types.ts' 