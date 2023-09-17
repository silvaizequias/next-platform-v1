import { prisma } from '@/libraries/prisma'
import {
  SchemaCreateUsersAndServices,
  SchemaCreateUsersAndServicesType,
} from '@/schemas/users-and-services'
import { Prisma } from '@prisma/client'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()
    return new Response(
      JSON.stringify(
        await prisma.usersAndServices.findMany({
          include: {
            user: true,
            service: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
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
      .then(async (inputs: SchemaCreateUsersAndServicesType) => {
        if (await SchemaCreateUsersAndServices.parseAsync(inputs)) {
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

          const data: Prisma.UsersAndServicesCreateInput = {
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
          return new Response(
            JSON.stringify(await prisma.usersAndServices.create({ data })),
          )
        }
      })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
