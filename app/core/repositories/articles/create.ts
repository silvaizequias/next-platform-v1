import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { createArticleType } from '../../validators/article.validator'

const prismaService = new PrismaService()

export async function repositoryCreateArticle(
  createArticle: createArticleType,
): Promise<CallbackPromise> {
  const { userPhone } = createArticle
  try {
    const user = prismaService.user.findFirst({
      where: { phone: userPhone, softDeleted: false },
    })
    if (!user)
      return {
        success: false,
        response: null,
        message: 'O usuário não foi encontrado!',
        status: 403,
      }

    delete createArticle?.userPhone

    return await prismaService.article
      .create({
        data: { ...createArticle, user: { connect: { phone: userPhone } } },
      })
      .then((data) => {
        return {
          success: true,
          response: data?.id,
          message: `O artigo ${data?.title} foi criado!`,
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
