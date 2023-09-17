import { prisma } from '@/libraries/prisma'
import {
  SchemaUpdateUsersAndServices,
  SchemaUpdateUsersAndServicesType,
} from '@/schemas/users-and-services'
import { Prisma } from '@prisma/client'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  try {
    await prisma.$connect()
    return new Response(
      JSON.stringify(
        await prisma.usersAndServices.findFirst({
          where: { id },
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

export const POST = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  try {
    await prisma.$connect()
    return await request
      .json()
      .then(async (inputs: SchemaUpdateUsersAndServicesType) => {
        if (await SchemaUpdateUsersAndServices.parseAsync(inputs)) {
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

          const data: Prisma.UsersAndServicesUpdateInput = {
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
          return new Response(
            JSON.stringify(
              await prisma.usersAndServices.update({ where: { id }, data }),
            ),
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
