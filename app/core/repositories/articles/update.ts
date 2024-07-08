import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { updateArticleType } from '../../validators/article.validator'

const prismaService = new PrismaService()

export async function repositoryUpdateArticle(
  id: string,
  updateArticle: updateArticleType,
): Promise<CallbackPromise> {
  try {
    const article = await prismaService.article.findFirst({
      where: { id: id, softDeleted: false },
    })
    if (!article)
      return {
        success: false,
        message: 'O artigo não foi encontrado!',
        status: 403,
      }

    return await prismaService.article
      .update({
        where: { id: id },
        data: { ...updateArticle },
      })
      .then((data) => {
        return {
          success: true,
          response: data?.id,
          message: `O artigo ${data?.title} foi atualizado!`,
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
