'use server'

import { UserType } from './../../types/user.type'
import { prisma } from '@/libraries/prisma'

export const getUsers = async (): Promise<UserType[] | any> => {
  try {
    return await prisma.user.findMany({
      where: { softDeleted: false },
      select: {
        id: true,
        active: true,
        profile: true,
        image: true,
        name: true,
        phone: true,
        email: true,
        organizations: {
          select: {
            id: true,
            active: true,
            role: true,
            organization: {
              select: {
                id: true,
                image: true,
                name: true,
                phone: true,
                email: true,
                document: true,
                zipCode: true,
                complement: true,
                latitude: true,
                longitude: true,
              },
            },
          },
        },
      },
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}

export const getUserByDocument = async (
  document: string,
): Promise<UserType | any> => {
  try {
    return await prisma.user.findFirst({
      where: { document: document, softDeleted: false },
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}

export const getUserByEmail = async (
  email: string,
): Promise<UserType | any> => {
  try {
    return await prisma.user.findFirst({
      where: { email: email, softDeleted: false },
      select: {
        id: true,
        active: true,
        name: true,
        phone: true,
        organizations: {
          select: {
            active: true,
            role: true,
            organization: {
              select: {
                id: true,
                name: true,
                document: true,
              },
            },
          },
        },
      },
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}

export const getUserById = async (id: string): Promise<UserType | any> => {
  try {
    return await prisma.user.findFirst({
      where: { id: id, softDeleted: false },
      include: {
        organizations: {
          select: {
            role: true,
            organization: {
              select: {
                id: true,
                name: true,
                document: true,
              },
            },
          },
        },
      },
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}

export const getUserByPhone = async (
  phone: string,
): Promise<UserType | any> => {
  try {
    return await prisma.user.findFirst({
      where: { phone: phone, softDeleted: false },
      select: {
        id: true,
        active: true,
        name: true,
        latitude: true,
        longitude: true,
        organizations: {
          select: {
            active: true,
            role: true,
            organization: {
              select: {
                id: true,
                name: true,
                document: true,
              },
            },
          },
        },
      },
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}
