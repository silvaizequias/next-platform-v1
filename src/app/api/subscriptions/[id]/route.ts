import { prisma } from '@/libraries/prisma'
import {
  SubscriptionUpdateSchema,
  SubscriptionUpdateSchemaType,
} from '@/schemas/subscription'
import { Prisma } from '@prisma/client'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id

  try {
    await prisma.$connect()
    return new Response(
      JSON.stringify(
        await prisma.subscription.findFirst({
          where: { id },
          include: {
            user: true,
            service: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id

  try {
    await prisma.$connect()
    return await request
      .json()
      .then(async (inputs: SubscriptionUpdateSchemaType) => {
        if (await SubscriptionUpdateSchema.parseAsync(inputs)) {
          const { userId, serviceId } = inputs
          delete inputs?.userId

          if (!userId) {
            await prisma.subscription.update({
              where: { id },
              data: inputs,
            })
          }

          const user = await prisma.user.findFirst({
            where: { id: userId },
          })
          if (!user)
            return new Response('O usuário não foi encontrado', { status: 404 })

          delete inputs?.serviceId
          if (!serviceId) {
            await prisma.subscription.update({
              where: { id },
              data: inputs,
            })
          }
          const service = await prisma.service.findFirst({
            where: { id: serviceId },
          })
          if (!service)
            return new Response('O serviço não foi encontrado', { status: 404 })

          const data: Prisma.SubscriptionUpdateInput = {
            ...inputs,
            user: {
              update: {
                id: user?.id!,
              },
            },
            service: {
              update: {
                id: service?.id!,
              },
            },
          }
          await prisma.subscription.update({ where: { id }, data })

          return new Response(JSON.stringify('A contratação foi atualizada'))
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
