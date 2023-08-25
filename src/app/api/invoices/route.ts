import { prisma } from '@/libraries/prisma'
import { InvoiceCreateSchema, InvoiceCreateSchemaType } from '@/schemas/invoice'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()
    return new Response(JSON.stringify(request.method))
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
      .then(async (inputs: InvoiceCreateSchemaType) => {
        if (InvoiceCreateSchema.validateSync(inputs)) {
          return new Response(JSON.stringify(inputs))
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
