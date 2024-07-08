import { PrismaService } from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { updateArticleType } from '../../validators/article.validator'

const prismaService = new PrismaService()

export async function repositoryUpdateArticle(
  id: string,
  updateArticle: updateArticleType,
): Promise<CallbackPromise> {
  try {
    return { success: true, response: { id, updateArticle } }
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
