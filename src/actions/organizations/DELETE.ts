'use server'

import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'

export const deleteOrganization = async (id: string): Promise<any> => {
  try {
    return id
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}

export const softDeleteOrganization = async (id: string): Promise<any> => {
  try {
    return id
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}
