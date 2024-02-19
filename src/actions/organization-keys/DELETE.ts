'use server'

import { prisma } from '@/libraries/prisma'

export const deleteOrganizationKey = async (id: string): Promise<any> => {
  try {
    return id
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}

export const softDeleteOrganizationKey = async (id: string): Promise<any> => {
  try {
    return id
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}
