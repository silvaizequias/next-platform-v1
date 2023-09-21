import { prisma } from '@/libraries/prisma'
import {
  SolutionCreateSchema,
  SolutionCreateSchemaType,
} from '@/types/solution/schema'

export async function GET(request: Request) {
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.solution.findMany({
          where: { softDeleted: false },
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

export async function POST(request: Request) {
  try {
    await prisma.$connect()

    return await request
      .json()
      .then(async (inputs: SolutionCreateSchemaType) => {
        if (await SolutionCreateSchema.parseAsync(inputs)) {
          return new Response(
            JSON.stringify(await prisma.solution.create({ data: inputs })),
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
