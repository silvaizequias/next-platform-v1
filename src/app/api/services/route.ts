import { prismaDedicated } from '@/libraries/prisma'
import { ServiceCreateSchema, ServiceCreateSchemaType } from '@/schemas/service'
import { Prisma } from '@prisma/client'

export const GET = async (request: Request) => {
  try {
    await prismaDedicated.$connect()
    return new Response(
      JSON.stringify(
        await prismaDedicated.service.findMany({
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
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prismaDedicated.$disconnect()
  }
}

export const POST = async (request: Request) => {
  const randomCode = Math.random().toString(32).substr(2, 12).toUpperCase()

  try {
    await prismaDedicated.$connect()
    return await request
      .json()
      .then(async (inputs: ServiceCreateSchemaType) => {
        if (await ServiceCreateSchema.parseAsync(inputs)) {
          const data: Prisma.ServiceCreateInput = {
            ...inputs,
          }
          return new Response(
            JSON.stringify(await prismaDedicated.service.create({ data })),
          )
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prismaDedicated.$disconnect()
  }
}
