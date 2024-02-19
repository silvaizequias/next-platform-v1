'use server'

import { prisma } from '@/libraries/prisma'
import {
  UpdateOrganizationUserSchema,
  UpdateOrganizationUserSchemaType,
} from '@/schemas/organization-user.schema'
import { Prisma } from '@prisma/client'

export const updateOrganizationUser = async (
  id: string,
  inputs: UpdateOrganizationUserSchemaType,
): Promise<any> => {
  try {
    if (await UpdateOrganizationUserSchema.parseAsync(inputs)) {
      const data: Prisma.OrganizationUsersUpdateInput = {
        ...inputs,
      }
      await prisma.organizationUsers.update({ where: { id: id }, data })

      return `as informações foram atualizadas`
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}
