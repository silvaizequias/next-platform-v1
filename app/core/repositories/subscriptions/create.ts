import PrismaService from '../../services/prisma.service'
import { CallbackPromise } from '../../types/promise.type'
import { createSubscriptionType } from '../../validators/subscription.validator'

const prismaService = new PrismaService()

export async function repositoryCreateSubscription(
  createSubscription: createSubscriptionType,
): Promise<CallbackPromise> {
  const { credit, organizationDocument } = createSubscription
  delete createSubscription.organizationDocument

  if (credit < 100)
    return {
      success: false,
      message: `A quantidade de créditos ${credit} é inferior a 100.`,
      status: 400,
    }

  const organization = await prismaService.organization.findFirst({
    where: { document: organizationDocument },
  })
  if (!organization)
    return {
      success: false,
      message: 'A organização não foi encontrada!',
      status: 403,
    }

  return await prismaService.subscription
    .create({
      data: {
        ...createSubscription,
        organization: { connect: { document: organizationDocument } },
      },
    })
    .then((data) => {
      return {
        success: true,
        message: `Foi adicionado ${credit} créditos para a ${organization?.name}`,
      }
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
