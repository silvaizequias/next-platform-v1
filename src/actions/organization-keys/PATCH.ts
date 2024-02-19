'use server'

import { prisma } from '@/libraries/prisma'
import {
  UpdateOrganizationKeySchema,
  UpdateOrganizationKeySchemaType,
} from '@/schemas/organization-key.schema'
import { Prisma } from '@prisma/client'

export const updateOrganizationKey = async (
  id: string,
  inputs: UpdateOrganizationKeySchemaType,
): Promise<any> => {
  try {
    if (await UpdateOrganizationKeySchema.parseAsync(inputs)) {
      const data: Prisma.OrganizationKeysUpdateInput = {
        ...inputs,
      }
      await prisma.organizationKeys.update({ where: { id: id }, data })

      return `as informações foram atualizadas`
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}
