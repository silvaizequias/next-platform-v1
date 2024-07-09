import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'

const prismaService = new PrismaService()

export async function repositoryFindAllOrganizations(): Promise<CallbackPromise> {
  return await prismaService.organization
    .findMany({
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
    .then((data) => {
      return {
        success: true,
        response: { count: data.length, data },
      }
    })
    .catch((error) => {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    })
    .finally(async () => await prismaService.$disconnect())
}

export async function repositoryFindByDocumentOrganization(
  document: string,
): Promise<CallbackPromise> {
  return await prismaService.organization
    .findFirst({
      where: { document: document, softDeleted: false },
      include: {
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
    .then((data) => {
      return { success: true, response: data }
    })
    .catch((error) => {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    })
    .finally(async () => await prismaService.$disconnect())
}

export async function repositoryFindOneOrganization(
  id: string,
): Promise<CallbackPromise> {
  return await prismaService.organization
    .findFirst({
      where: { id: id, softDeleted: false },
      include: {
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
    .then((data) => {
      return { success: true, response: data }
    })
    .catch((error) => {
      return {
        success: false,
        message: error?.message,
        status: error?.status,
      }
    })
    .finally(async () => await prismaService.$disconnect())
}
