import { prisma } from '@/libraries/prisma'
import { ServiceUpdateSchema, ServiceUpdateSchemaType } from '@/schemas/service'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id
  try {
    await prisma.$connect()

    return new Response(JSON.stringify(id))
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
        if (ServiceUpdateSchema.validateSync(inputs)) {
          return new Response(JSON.stringify(id))
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
