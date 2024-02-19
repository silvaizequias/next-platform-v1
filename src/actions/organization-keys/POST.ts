'use server'

import { prisma } from '@/libraries/prisma'
import {
  CreateOrganizationKeySchema,
  CreateOrganizationKeySchemaType,
} from '@/schemas/organization-key.schema'
import { Prisma } from '@prisma/client'
import { randomBytes } from 'crypto'

export const postOrganizationKey = async (
  inputs: CreateOrganizationKeySchemaType,
): Promise<any> => {
  try {
    if (await CreateOrganizationKeySchema.parseAsync(inputs)) {
      const { organizationDocument } = inputs
      delete inputs?.organizationDocument

      const organization = await prisma.organization.findFirst({
        where: { document: organizationDocument },
      })
      if (!organization) return 'a organização não foi encontrada'

      const organziationKey = await prisma.organizationKeys.findFirst({
        where: {
          organizationId: organization?.id,
        },
      })
      if (organziationKey)
        return `a organziação ${organization?.name} já possui uma chave de autorização`

      const authorizationKey = randomBytes(32).toString('hex')

      const data: Prisma.OrganizationKeysCreateInput = {
        ...inputs,
        authorizationKey: authorizationKey,
        organization: {
          connect: {
            document: organizationDocument,
          },
        },
      }
      await prisma.organizationKeys.create({ data })

      return `a chave de autorização para conexão da ${organization?.name} foi criada`
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}
