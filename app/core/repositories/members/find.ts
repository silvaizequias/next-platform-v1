import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'

const prismaService = new PrismaService()

export async function repositoryFindAllMembers(): Promise<CallbackPromise> {
  return await prismaService.member
    .findMany({
      where: { softDeleted: false },
      take: 100,
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            image: true,
            document: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
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

export async function repositoryFindOneMember(
  id: string,
): Promise<CallbackPromise> {
  return await prismaService.member
    .findFirst({
      where: { id: id, softDeleted: false },
      include: {
        organization: true,
        user: {
          select: {
            id: true,
            role: true,
            name: true,
            image: true,
            phone: true,
            email: true,
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
