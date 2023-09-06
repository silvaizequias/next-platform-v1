import { prisma } from '@/libraries/prisma'
import {
  SolutionCreateSchema,
  SolutionCreateSchemaType,
} from '@/schemas/solution'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()
    return new Response(
      JSON.stringify(
        await prisma.solution.findMany({
          include: {
            services: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const POST = async (request: Request) => {
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
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
