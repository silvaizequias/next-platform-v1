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
    return new Response(
      JSON.stringify(`as informações da organização foram atualizadas`),
      { status: 201 },
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
