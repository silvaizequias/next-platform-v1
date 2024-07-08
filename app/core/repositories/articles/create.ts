import { PrismaService } from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { createArticleType } from '../../validators/article.validator'

const prismaService = new PrismaService()

export async function repositoryCreateArticle(
  createArticle: createArticleType,
): Promise<CallbackPromise> {
  try {
    return createArticle
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
