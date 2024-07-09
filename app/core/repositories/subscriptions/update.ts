import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { updateSubscriptionType } from '../../validators/subscription.validator'

const prismaService = new PrismaService()

export async function repositoryUpdateSubscription(
  id: string,
  updateSubscription: updateSubscriptionType,
): Promise<CallbackPromise> {
  const { credit, unlimited } = updateSubscription
  try {
    const subscription = await prismaService.subscription.findFirst({
      where: { id: id },
    })
    if (!subscription)
      return {
        success: false,
        status: 404,
        message: `A assinatura não foi encontrada!`,
      }

    const organizationId = subscription?.organizationId

    const organization = await prismaService.organization.findFirst({
      where: { id: organizationId },
    })
    if (!organization)
      return {
        success: false,
        status: 404,
        message: `A organização não foi encontrada!`,
      }

    const adds: number = subscription?.credit! + credit!

    return await prismaService.subscription
      .update({
        where: { id: id },
        data: {
          ...updateSubscription,
          credit: credit ? adds : subscription?.credit,
        },
      })
      .then((data) => {
        return {
          success: true,
          message: unlimited
            ? `A organização ${organization?.name} agora possui uma assinatura ilimitada para consumo de recursos na plataforma!`
            : `A assinatura da organização ${organization?.name} foi atualizada!`,
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
