import { prisma } from '@/libraries/prisma'
import {
  ContractUpdateSchema,
  ContractUpdateSchemaType,
} from '@/schemas/contract'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.contract.findFirst({
          where: { id },
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
      .then(async (inputs: ContractUpdateSchemaType) => {
        if (await ContractUpdateSchema.parseAsync(inputs)) {
          return new Response(
            JSON.stringify(
              await prisma.contract.update({ where: { id }, data: inputs }),
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
