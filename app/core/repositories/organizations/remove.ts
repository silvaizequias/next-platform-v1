import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { removeOrganizationType } from '../../validators/organization.validator'

const prismaService = new PrismaService()

export async function repositoryRemoveOrganization(
  id: string,
  removeOrganization: removeOrganizationType,
): Promise<CallbackPromise> {
  const { definitely } = removeOrganization
  try {
    const organization = await prismaService.organization.findFirst({
      where: { id: id, softDeleted: false },
    })
    if (!organization)
      return {
        success: false,
        status: 404,
        message: `A organização não foi encontrado!`,
      }

    if (definitely)
      await prismaService.organization.delete({
        where: { id: id, softDeleted: true },
      })

    await prismaService.organization.update({
      where: { id: id, softDeleted: false },
      data: {
        softDeleted: true,
      },
    })

    return {
      success: true,
      response: id,
      message: `A organização ${organization?.name ?? ''} foi removido ${
        definitely ? 'definitivamente' : ''
      } da plataforma!`,
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
