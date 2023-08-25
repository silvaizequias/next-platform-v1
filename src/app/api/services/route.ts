import { prisma } from '@/libraries/prisma'
import { ServiceCreateSchema, ServiceCreateSchemaType } from '@/schemas/service'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()
    return new Response(JSON.stringify(await prisma.service.findMany()))
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export const POST = async (request: Request) => {
  try {
    await prisma.$connect()
    return await request
      .json()
      .then(async (inputs: ServiceCreateSchemaType) => {
        if (await ServiceCreateSchema.parseAsync(inputs)) {
          return new Response(
            JSON.stringify(await prisma.service.create({ data: inputs })),
          )
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
