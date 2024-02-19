'use server'

import { prisma } from '@/libraries/prisma'
import { OrganizationType } from '@/types/organization.type'

export const getOrganizations = async (): Promise<OrganizationType[] | any> => {
  try {
    return new Response(
      JSON.stringify(
        await prisma.organization.findMany({
          where: { softDeleted: false },
          include: {
            subscriptions: true,
            users: {
              select: {
                id: true,
                active: true,
                role: true,
                user: {
                  select: {
                    id: true,
                    profile: true,
                    name: true,
                    phone: true,
                  },
                },
              },
            },
          },
        }),
      ),
      { status: 200 },
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const getOrganizationById = async (
  id: string,
): Promise<OrganizationType | any> => {
  try {
    return new Response(
      JSON.stringify(
        await prisma.organization.findFirst({
          where: { id: id, softDeleted: false },
          include: {
            subscriptions: true,
            authorizationKey: {
              select: {
                expireIn: true,
                active: true,
                authorizationKey: true,
              },
            },
            users: {
              select: {
                id: true,
                active: true,
                role: true,
                user: {
                  select: {
                    id: true,
                    profile: true,
                    name: true,
                    phone: true,
                  },
                },
              },
            },
          },
        }),
      ),
      { status: 200 },
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const getOrganizationByDocument = async (
  document: string,
): Promise<OrganizationType | any> => {
  try {
    return new Response(
      JSON.stringify(
        await prisma.organization.findFirst({
          where: { document: document, softDeleted: false },
          include: {
            subscriptions: true,
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
                active: true,
                role: true,
                user: {
                  select: {
                    id: true,
                    image: true,
                    profile: true,
                    name: true,
                    phone: true,
                  },
                },
              },
            },
          },
        }),
      ),
      { status: 200 },
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
