'use server'

import { prisma } from '@/libraries/prisma'
import {
  CreateOrganizationSchema,
  CreateOrganizationSchemaType,
} from '@/schemas/organization.schema'
import { Prisma } from '@prisma/client'

export const postOrganization = async (
  inputs: CreateOrganizationSchemaType,
): Promise<any> => {
  try {
    if (await CreateOrganizationSchema.parseAsync(inputs)) {
      const { name, document } = inputs
      const organization = await prisma.organization.findFirst({
        where: { document: document },
      })
      if (organization)
        return new Response(
          JSON.stringify(`a organização ${name} já existe na plataforma`),
          { status: 409 },
        )

      const data: Prisma.OrganizationCreateInput = {
        ...inputs,
      }
      await prisma.organization.create({ data })

      return new Response(
        JSON.stringify(`a organização ${name} foi criada no sistema`),
        { status: 201 },
      )
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
