import { prismaDedicated } from '@/libraries/prisma'
import { ServiceUpdateSchema, ServiceUpdateSchemaType } from '@/schemas/service'
import { Prisma } from '@prisma/client'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id
  try {
    await prismaDedicated.$connect()

    return new Response(
      JSON.stringify(
        await prismaDedicated.service.findFirst({
          where: { id },
          include: {
            subscriptions: {
              include: {
                user: true,
              },
            },
          },
        }),
      ),
    )
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prismaDedicated.$disconnect()
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id
  try {
    await prismaDedicated.$connect()
    return await request
      .json()
      .then(async (inputs: ServiceUpdateSchemaType) => {
        if (await ServiceUpdateSchema.parseAsync(inputs)) {
          const data: Prisma.ServiceUpdateInput = {
            ...inputs,
          }

          return new Response(
            JSON.stringify(
              await prismaDedicated.service.update({ where: { id }, data }),
            ),
          )
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prismaDedicated.$disconnect()
  }
}
