import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { removeArticleType } from '../../validators/article.validator'

const prismaService = new PrismaService()

export async function repositoryRemoveArticle(
  id: string,
  removeArticle: removeArticleType,
): Promise<CallbackPromise> {
  const { definitely } = removeArticle
  try {
    const article = await prismaService.article.findFirst({
      where: { id: id, softDeleted: false },
    })
    if (!article)
      return {
        success: false,
        status: 404,
        message: `O artigo não foi encontrado!`,
      }

    if (definitely)
      await prismaService.article.delete({
        where: { id: id, softDeleted: true },
      })

    await prismaService.article.update({
      where: { id: id, softDeleted: false },
      data: {
        softDeleted: true,
      },
    })

    return {
      success: true,
      response: id,
      message: `O artigo ${article?.title ?? ''} foi removido ${
        definitely ? 'definitivamente' : ''
      } da plataforma!`,
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
