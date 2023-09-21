import { prisma } from '@/libraries/prisma'
import {
  ContractUpdateSchema,
  ContractUpdateSchemaType,
} from '@/types/contract/schema'
import { Prisma } from '@prisma/client'

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
    return new Response(JSON.stringify(error?.message || error), { status: 400 })
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

          delete inputs?.userDocCode
          delete inputs?.solutionUrl

          const data: Prisma.ContractUpdateInput = {
            ...inputs,
            user: {
              update: {
                id: user?.id!,
              },
            },
            solution: {
              update: {
                id: solution?.id!,
              },
            },
          }

          return new Response(
            JSON.stringify(
              await prisma.contract.update({ where: { id }, data }),
            ),
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
