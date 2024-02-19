'use server'

import { prisma } from '@/libraries/prisma'
import { OrganizationUserType } from '@/types/organization-user.type'

export const getOrganizationUsers = async (): Promise<
  OrganizationUserType[] | any
> => {
  try {
    return await prisma.organizationUsers.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        active: true,
        role: true,
        organization: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
            phone: true,
            document: true,
            zipCode: true,
            complement: true,
            latitude: true,
            longitude: true,
          },
        },
        user: {
          select: {
            id: true,
            profile: true,
            name: true,
            image: true,
            email: true,
            phone: true,
            zipCode: true,
            complement: true,
            latitude: true,
            longitude: true,
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

export const getOrganizationUserById = async (
  id: string,
): Promise<OrganizationUserType | any> => {
  try {
    return await prisma.organizationUsers.findFirst({
      where: { id: id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        active: true,
        role: true,
        organization: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
            phone: true,
            document: true,
            zipCode: true,
            complement: true,
            latitude: true,
            longitude: true,
          },
        },
        user: {
          select: {
            id: true,
            profile: true,
            name: true,
            image: true,
            email: true,
            phone: true,
            zipCode: true,
            complement: true,
            latitude: true,
            longitude: true,
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

export const getOrganizationUserByUserId = async (
  id: string,
): Promise<OrganizationUserType[] | any> => {
  try {
    return await prisma.organizationUsers.findMany({
      where: { userId: id, active: true },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        active: true,
        role: true,
        organization: {
          include: {
            authorizationKey: {
              select: {
                active: true,
                expireIn: true,
                authorizationKey: true,
              },
            },
            users: {
              select: {
                id: true,
                role: true,
                active: true,
                user: {
                  select: {
                    id: true,
                    active: true,
                    profile: true,
                    image: true,
                    name: true,
                    phone: true,
                    email: true,
                  },
                },
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
