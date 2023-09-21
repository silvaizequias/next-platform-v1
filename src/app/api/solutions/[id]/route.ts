import { prisma } from '@/libraries/prisma'
import {
  SolutionUpdateSchema,
  SolutionUpdateSchemaType,
} from '@/types/solution/schema'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params

  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.solution.findFirst({
          where: { id: id, softDeleted: false },
          include: {
            contracts: true,
            organizations: true,
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
      .then(async (inputs: SolutionUpdateSchemaType) => {
        if (await SolutionUpdateSchema.parseAsync(inputs)) {
          return new Response(
            JSON.stringify(
              await prisma.solution.update({ where: { id }, data: inputs }),
            ),
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
