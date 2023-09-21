import { prisma } from '@/libraries/prisma'
import {
  ContractCreateSchema,
  ContractCreateSchemaType,
} from '@/types/contract/schema'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.contract.findMany({
          where: { softDeleted: false },
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

export async function POST(request: Request) {
  try {
    await prisma.$connect()

    return await request
      .json()
      .then(async (inputs: ContractCreateSchemaType) => {
        if (await ContractCreateSchema.parseAsync(inputs)) {
          const { userId, solutionId, discount, tax, amount } = inputs
          const user = await prisma.user.findFirst({
            where: { id: userId, softDeleted: false, isActive: true },
          })
          if (!user)
            return new Response(
              JSON.stringify('esta conta não pode contratar serviços'),
              { status: 403 },
            )

          const solution = await prisma.solution.findFirst({
            where: { id: solutionId },
          })
          if (!solution)
            return new Response(
              JSON.stringify('a solução não está disponível para contratação'),
              { status: 404 },
            )

          const totalAmount: number = Math.floor(amount! - discount! + tax!)

          const data: Prisma.ContractCreateInput = {
            ...inputs,
            amount: totalAmount,
            user: {
              connect: {
                id: userId,
              },
            },
            solution: {
              connect: {
                id: solutionId,
              },
            },
          }
          return new Response(
            JSON.stringify(await prisma.contract.create({ data })),
          )
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
