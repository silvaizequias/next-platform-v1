'use server'

import { prisma } from '@/libraries/prisma'
import { ApiSpendType } from '@/types/api-spend'

export const getApiSpends = async (): Promise<ApiSpendType[] | any> => {
  try {
    return await prisma.apiSpend.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}

export const countApiSpends = async (): Promise<any> => {
  try {
    return await prisma.apiSpend.count()
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}

export const getApiSpendById = async (
  id: string,
): Promise<ApiSpendType | any> => {
  try {
    return await prisma.apiSpend.findFirst({
      where: { id: id },
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}

export const getApiSpendByDocument = async (
  document: string,
): Promise<ApiSpendType[] | any> => {
  try {
    return await prisma.apiSpend.findMany({
      where: { document: document },
      orderBy: {
        createdAt: 'desc',
      },
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}

export const countApiSpendByDocument = async (
  document: string,
): Promise<any> => {
  try {
    return await prisma.apiSpend.count({
      where: { document: document },
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}
