'use server'

import { prisma } from '@/libraries/prisma'

export const deleteOrganizationUser = async (id: string): Promise<any> => {
  try {
    return id
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}

export const softDeleteOrganizationUser = async (id: string): Promise<any> => {
  try {
    return id
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}
