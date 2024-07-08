import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { updateOrganizationType } from '../../validators/organization.validator'

const prismaService = new PrismaService()

export async function repositoryUpdateOrganization(
  id: string,
  updateOrganization: updateOrganizationType,
): Promise<CallbackPromise> {
  try {
    const organization = await prismaService.organization.findFirst({
      where: { id: id },
    })
    if (!organization)
      return {
        success: false,
        status: 404,
        message: `A organização não foi encontrado!`,
      }

    await prismaService.organization.update({
      where: { id: id },
      data: { ...updateOrganization },
    })
    return {
      success: true,
      response: id,
      message: `As informações da organização ${
        organization?.name ?? ''
      } foram atualizadas`,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message,
      status: error?.status,
    }
  } finally {
    await prismaService.$disconnect()
  }
}
