import { prisma } from '@/libraries/prisma'
import {
  ContractCreateSchema,
  ContractCreateSchemaType,
} from '@/schemas/contract'

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
      .then(async (inputs: ContractCreateSchemaType) => {
        if (ContractCreateSchema.validateSync(inputs)) {
          return new Response(JSON.stringify(inputs))
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
