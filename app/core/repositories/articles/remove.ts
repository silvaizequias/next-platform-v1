import { PrismaService } from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { removeArticleType } from '../../validators/article.validator'

const prismaService = new PrismaService()

export async function repositoryRemoveArticle(
  id: string,
  removeArticle: removeArticleType,
): Promise<CallbackPromise> {
  try {
    return { success: true, response: { id, removeArticle } }
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
