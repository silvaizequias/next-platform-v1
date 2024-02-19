'use server'

import { prisma } from '@/libraries/prisma'

export const deleteUser = async (id: string): Promise<any> => {
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

export const softDeleteUser = async (id: string): Promise<any> => {
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
