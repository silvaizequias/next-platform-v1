import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'

const prismaService = new PrismaService()

export async function repositoryFindAllSubscriptions(): Promise<CallbackPromise> {
  return await prismaService.subscription
    .findMany({
      where: { softDeleted: false },
      take: 100,
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

export async function repositoryFindOneSubscription(
  id: string,
): Promise<CallbackPromise> {
  return await prismaService.subscription
    .findFirst({ where: { id: id, softDeleted: false } })
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
