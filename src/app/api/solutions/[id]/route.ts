import { prisma } from '@/libraries/prisma'
import {
  SolutionUpdateSchema,
  SolutionUpdateSchemaType,
} from '@/schemas/solution'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id

  try {
    await prisma.$connect()
    return new Response(
      JSON.stringify(
        await prisma.solution.findFirst({
          where: { id },
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

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id

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
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
