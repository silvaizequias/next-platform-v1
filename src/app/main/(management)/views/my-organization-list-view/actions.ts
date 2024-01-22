'use server'

import { prisma } from '@/libraries/prisma'
import { CreateOrganizationDTOType } from '@/app/api/organizations/dto'
import { Session } from 'next-auth'
import { Prisma } from '@prisma/client'

export async function actionCreateMyOrganization(
  inputs: CreateOrganizationDTOType,
  session: Session,
) {
  try {
    const { name, documentCode } = inputs

    const organization = await prisma.organization.findFirst({
      where: { documentCode: documentCode },
    })
    if (organization)
      return JSON.stringify(`a organziação ${name} já existe na plataforma`)

    const data: Prisma.OrganizationUsersCreateInput = {
      active: true,
      role: 'owner',
      user: {
        connect: {
          id: session?.user?.id,
        },
      },
      organization: {
        create: inputs,
      },
    }

    return {
      status: 201,
      data: await prisma.organizationUsers.create({ data }),
      message: `a organização ${name} foi criada na plataforma`,
    }
  } catch (error: any) {
    await prisma.$disconnect()
    throw new Error(error)
  } finally {
    await prisma.$disconnect()
  }
}
