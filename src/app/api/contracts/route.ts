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
    return new Response(JSON.stringify(error?.message || error), { status: 400 })
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
          const { userDocCode, solutionUrl, discount, tax, amount } = inputs
          const user = await prisma.user.findFirst({
            where: { docCode: userDocCode, softDeleted: false, isActive: true },
          })
          if (!user)
            return new Response(
              JSON.stringify('esta conta não pode contratar serviços'),
              { status: 403 },
            )

          const solution = await prisma.solution.findFirst({
            where: { url: solutionUrl },
          })
          if (!solution)
            return new Response(
              JSON.stringify('a solução não está disponível para contratação'),
              { status: 404 },
            )

          const totalAmount: number = Math.floor(amount! - discount! + tax!)

          delete inputs?.userDocCode
          delete inputs?.solutionUrl

          const data: Prisma.ContractCreateInput = {
            ...inputs,
            amount: totalAmount,
            user: {
              connect: {
                id: user?.id!,
              },
            },
            solution: {
              connect: {
                id: solution?.id!,
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
    return new Response(JSON.stringify(error?.message || error), { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
