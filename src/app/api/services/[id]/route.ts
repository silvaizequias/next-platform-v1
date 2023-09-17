import { prisma } from '@/libraries/prisma'
import { ServiceUpdateSchema, ServiceUpdateSchemaType } from '@/schemas/service'
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
        await prisma.service.findFirst({
          where: { id },
          include: {
            subscriptions: {
              include: {
                user: true,
              },
            },
            users: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
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
      .then(async (inputs: ServiceUpdateSchemaType) => {
        if (await ServiceUpdateSchema.parseAsync(inputs)) {
          const data: Prisma.ServiceUpdateInput = {
            ...inputs,
          }

          return new Response(
            JSON.stringify(
              await prisma.service.update({ where: { id }, data }),
            ),
          )
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
