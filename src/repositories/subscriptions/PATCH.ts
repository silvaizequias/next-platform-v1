'use server'

import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'

export const method = async (): Promise<any>  => {
  try {
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}