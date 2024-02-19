'use server'

import { prisma } from '@/libraries/prisma'
import { UpdateOrganizationSchemaType } from '@/schemas/organization.schema'

export const updateOrganization = async (
  id: string,
  inputs: UpdateOrganizationSchemaType,
): Promise<any> => {
  try {
    const organziation = await prisma.organization.findFirst({
      where: { id: id },
    })
    if (!organziation)
      return new Response(JSON.stringify('organização não encontrado'), {
        status: 404,
      })

    await prisma.organization.update({
      where: { id: id },
      data: { ...inputs },
    })
    return `as informações da organização foram atualizadas`
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}
