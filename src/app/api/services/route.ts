import { prisma } from '@/libraries/prisma'
import { ServiceCreateSchema, ServiceCreateSchemaType } from '@/schemas/service'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()
    return new Response(
      JSON.stringify(
        await prisma.service.findMany({
          include: {
            contracts: {
              select: {
                id: true,
                contractCode: true,
                user: {
                  select: {
                    id: true,
                    isActive: true,
                    name: true,
                    phone: true,
                    email: true,
                  },
                },
                invoices: true,
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
    await prisma.$disconnect()
  }
}

export const POST = async (request: Request) => {
  const randomCode = Math.random().toString(32).substr(2, 12).toUpperCase()

  try {
    await prisma.$connect()
    return await request
      .json()
      .then(async (inputs: ServiceCreateSchemaType) => {
        if (await ServiceCreateSchema.parseAsync(inputs)) {
          return new Response(
            JSON.stringify(
              await prisma.service.create({
                data: {
                  ...inputs,
                  serviceCode: randomCode,
                },
              }),
            ),
          )
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
