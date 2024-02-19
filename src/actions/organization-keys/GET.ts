'use server'

import { prisma } from '@/libraries/prisma'
import { OrganizationKeyType } from '@/types/organization-key.type'

export const getOrganizationKeys = async (): Promise<
  OrganizationKeyType[] | any
> => {
  try {
    return new Response(
      JSON.stringify(
        await prisma.organizationKeys.findMany({
          select: {
            id: true,
            active: true,
            expireIn: true,
            organization: true,
          },
        }),
      ),
      { status: 200 },
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}

export const getOrganizationKeyById = async (
  id: string,
): Promise<OrganizationKeyType | any> => {
  try {
    return await prisma.organizationKeys.findFirst({
      where: { id: id },
      include: {
        organization: true,
      },
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}

export const getOrganizationKeyByKey = async (
  key: string,
): Promise<OrganizationKeyType | any> => {
  try {
    return await prisma.organizationKeys.findFirst({
      where: { authorizationKey: key },
      select: {
        active: true,
        expireIn: true,
        organization: {
          select: {
            id: true,
            document: true,
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
