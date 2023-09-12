import { Prisma } from '@prisma/client'
import { prisma } from '@/libraries/prisma'
import {
  SubscriptionCreateSchema,
  SubscriptionCreateSchemaType,
} from '@/schemas/subscription'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()
    return new Response(
      JSON.stringify(
        await prisma.subscription.findMany({
          include: {
            service: true,
            user: true,
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

export const POST = async (request: Request) => {
  try {
    await prisma.$connect()
    return await request
      .json()
      .then(async (inputs: SubscriptionCreateSchemaType) => {
        if (await SubscriptionCreateSchema.parseAsync(inputs)) {
          const { userId, serviceId } = inputs
          const user = await prisma.user.findFirst({
            where: { id: userId },
          })
          if (!user)
            return new Response('O usuário não foi encontrado', { status: 404 })

          const service = await prisma.service.findFirst({
            where: { id: serviceId },
          })
          if (!service)
            return new Response('O serviço não foi encontrado', { status: 404 })

          delete inputs?.userId
          delete inputs?.serviceId

          const data: Prisma.SubscriptionCreateInput = {
            ...inputs,
            user: {
              connect: {
                id: user?.id!,
              },
            },
            service: {
              connect: {
                id: service?.id!,
              },
            },
          }
          await prisma.subscription.create({ data })

          return new Response(JSON.stringify('A contratação foi realizada!'))
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
