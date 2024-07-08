import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { createOrganizationType } from '../../validators/organization.validator'

const prismaService = new PrismaService()

export async function repositoryCreateOrganization(
  createOrganization: createOrganizationType,
): Promise<CallbackPromise> {
  const { document, name } = createOrganization
  try {
    const organization = await prismaService.organization.findFirst({
      where: { document: document },
    })
    if (organization)
      return {
        success: false,
        status: 409,
        message: `Não foi possível registrar esta organização!`,
      }

    return await prismaService.organization
      .create({ data: createOrganization })
      .then((data) => {
        return {
          success: true,
          response: data?.id,
          message: `A organização ${name ?? ''} foi criada na plataforma!`,
        }
      })
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
