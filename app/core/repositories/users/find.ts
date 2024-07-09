import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'

const prismaService = new PrismaService()

export async function repositoryFindAllUsers(): Promise<CallbackPromise> {
  return await prismaService.user
    .findMany({
      take: 100,
      orderBy: { createdAt: 'desc' },
      where: { softDeleted: false },
      select: {
        id: true,
        updatedAt: true,
        active: true,
        lastLogin: true,
        role: true,
        name: true,
        phone: true,
        organizations: {
          take: 100,
          include: {
            organization: {
              select: {
                id: true,
                name: true,
                document: true,
              },
            },
          },
        },
      },
    })
    .then((data) => {
      return { success: true, response: { count: data.length, data } }
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

export async function repositoryFindOneUser(
  id: string,
): Promise<CallbackPromise> {
  return await prismaService.user
    .findFirst({
      where: { id: id, softDeleted: false },
      include: {
        organizations: {
          take: 100,
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
