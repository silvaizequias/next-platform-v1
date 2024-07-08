import { PrismaService } from '../../services/prisma.service'
import { Organization } from '../../types/organization.type'
import { CallbackPromise } from '../../types/promise.type'

const prismaService = new PrismaService()

export async function repositoryFindAllOrganizations(): Promise<CallbackPromise> {
  try {
    const organizations: Organization[] | any =
      await prismaService.organization.findMany({
        take: 100,
        orderBy: { createdAt: 'desc' },
        where: { softDeleted: false },
        select: {
          id: true,
          updatedAt: true,
          active: true,
          name: true,
          document: true,
        },
      })
    const count = await prismaService.organization.count({
      where: { softDeleted: false },
    })
    return {
      success: true,
      response: { count: count, organizations: organizations },
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

export async function repositoryFindByDocumentOrganization(
  document: string,
): Promise<CallbackPromise> {
  try {
    const organization: Organization | any =
      await prismaService.organization.findFirst({
        where: { document: document, softDeleted: false },
        include: {
          address: true,
          members: {
            take: 100,
            include: {
              user: {
                select: {
                  id: true,
                  active: true,
                  role: true,
                  name: true,
                  image: true,
                  phone: true,
                  email: true,
                },
              },
            },
          },
        },
      })
    if (!organization)
      return {
        success: false,
        status: 404,
        message: `A organização não foi encontrado!`,
      }

    return { success: true, response: organization }
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

export async function repositoryFindOneOrganization(
  id: string,
): Promise<CallbackPromise> {
  try {
    const organization: Organization | any =
      await prismaService.organization.findFirst({
        where: { id: id, softDeleted: false },
        include: {
          address: true,
          members: {
            take: 100,
            include: {
              user: {
                select: {
                  id: true,
                  active: true,
                  role: true,
                  name: true,
                  image: true,
                  phone: true,
                  email: true,
                },
              },
            },
          },
        },
      })
    if (!organization)
      return {
        success: false,
        status: 404,
        message: `A organização não foi encontrado!`,
      }

    return { success: true, response: organization }
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
