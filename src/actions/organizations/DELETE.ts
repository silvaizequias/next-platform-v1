'use server'

import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'

export const deleteOrganization = async (id: string): Promise<any> => {
  try {
    return new Response(JSON.stringify(id), { status: 200 })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const softDeleteOrganization = async (id: string): Promise<any> => {
  try {
    return new Response(JSON.stringify(id), { status: 200 })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
