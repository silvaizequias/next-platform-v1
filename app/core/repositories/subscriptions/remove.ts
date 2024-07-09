import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { removeSubscriptionType } from '../../validators/subscription.validator'

const prismaService = new PrismaService()

export async function repositoryRemoveSubscription(
  id: string,
  removeSubscription: removeSubscriptionType,
): Promise<CallbackPromise> {
  const { definitely } = removeSubscription
  try {
    const subscription = await prismaService.subscription.findFirst({
      where: { id: id, softDeleted: false },
    })
    if (!subscription)
      return {
        success: false,
        status: 404,
        message: `A assinatura não foi encontrado!`,
      }

    if (definitely)
      await prismaService.subscription.delete({
        where: { id: id, softDeleted: true },
      })

    await prismaService.subscription.update({
      where: { id: id, softDeleted: false },
      data: {
        softDeleted: true,
      },
    })

    return {
      success: true,
      response: id,
      message: `A assinatura foi removido ${
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
