import { prisma } from '@/libraries/prisma'
import {
  SolutionCreateSchema,
  SolutionCreateSchemaType,
} from '@/types/solution/schema'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.solution.findMany({
          where: { softDeleted: false },
          include: {
            subscriptions: true,
            organizations: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message! || error!, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export const POST = async (
  request: Request,
): Promise<SolutionCreateSchemaType | any> => {
  try {
    await prisma.$connect()

    return await request
      .json()
      .then(async (inputs: SolutionCreateSchemaType) => {
        if (await SolutionCreateSchema.parseAsync(inputs)) {
          return new Response(
            JSON.stringify(await prisma.solution.create({ data: inputs })),
            { status: 201 },
          )
        }
      })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message! || error!, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
