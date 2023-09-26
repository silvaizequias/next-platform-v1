import { prisma } from '@/libraries/prisma'
import {
  SolutionUpdateSchema,
  SolutionUpdateSchemaType,
} from '@/types/solution/schema'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params

  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.solution.findFirst({
          where: { id: id, softDeleted: false },
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

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<SolutionUpdateSchemaType | any> => {
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
