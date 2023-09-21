import { prisma } from '@/libraries/prisma'
import {
  ContractUpdateSchema,
  ContractUpdateSchemaType,
} from '@/types/contract/schema'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.contract.findFirst({
          where: { id: id, softDeleted: false },
          include: {
            user: true,
            solution: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
    console.error(error)
    return new Error(error?.message || error)
  } finally {
    await prisma.$disconnect()
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    await prisma.$connect()
    
    return await request
      .json()
      .then(async (inputs: ContractUpdateSchemaType) => {
        if (await ContractUpdateSchema.parseAsync(inputs)) {
          return new Response(JSON.stringify(inputs))
        }
      })
  } catch (error: any) {
    await prisma.$disconnect()
    console.error(error)
    return new Error(error?.message || error)
  } finally {
    await prisma.$disconnect()
  }
}
