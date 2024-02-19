'use server'

import { prisma } from '@/libraries/prisma'
import {
  CreateOrganizationUserSchema,
  CreateOrganizationUserSchemaType,
} from '@/schemas/organization-user.schema'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export const postOrganizationUser = async (
  inputs: CreateOrganizationUserSchemaType,
): Promise<any> => {
  const randomCode = Math.random().toString(32).substr(2, 14)
  try {
    if (await CreateOrganizationUserSchema.parseAsync(inputs)) {
      const { userPhone, organizationDocument, role } = inputs
      delete inputs?.userPhone
      delete inputs?.organizationDocument

      const organization = await prisma.organization.findFirst({
        where: { document: organizationDocument },
      })
      if (!organization)
        return new Response(
          JSON.stringify('a organização não foi encontrada'),
          {
            status: 404,
          },
        )

      const user = await prisma.user.findFirst({
        where: { phone: userPhone },
      })
      if (!user) {
        const data: Prisma.OrganizationUsersCreateInput = {
          ...inputs,
          organization: {
            connect: {
              document: organizationDocument,
            },
          },
          user: {
            create: {
              profile: 'member',
              name: 'Usuário da ' + organization?.name?.split(' ')[0],
              phone: userPhone!,
              email: userPhone + '@dedicado.digital',
              passHash: hashSync(randomCode, 10),
            },
          },
        }
        await prisma.organizationUsers.create({ data })
        return `o usuario foi criado e incluído na organização ${organization?.name} como ${role}`
      }

      const organizationUser = await prisma.organizationUsers.findFirst({
        where: { userId: user?.id },
      })
      if (
        organizationUser &&
        organizationUser.organizationId == organization.id
      )
        return `${user?.name} já está como ${organizationUser?.role} na organização ${organization?.name}`

      const data: Prisma.OrganizationUsersCreateInput = {
        ...inputs,
        role: role || 'client',
        user: {
          connect: {
            phone: userPhone,
          },
        },
        organization: {
          connect: {
            document: organizationDocument,
          },
        },
      }
      await prisma.organizationUsers.create({ data })

      return `o usuário ${user?.name} agora faz parte da organização ${organization?.name}`
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}
