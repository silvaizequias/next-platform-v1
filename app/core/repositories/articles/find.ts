import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'

const prismaService = new PrismaService()

export async function repositoryFindAllArticles(): Promise<CallbackPromise> {
  return await prismaService.article
    .findMany({ where: { softDeleted: false }, take: 100 })
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

export async function repositoryFindBySlugArticle(
  slug: string,
): Promise<CallbackPromise> {
  return await prismaService.article
    .findFirst({ where: { slug: slug, softDeleted: false } })
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

export async function repositoryFindOneArticle(
  id: string,
): Promise<CallbackPromise> {
  return await prismaService.article
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
