import { prisma } from '@/libraries/prisma'
import { ServiceCreateSchema, ServiceCreateSchemaType } from '@/schemas/service'
import { Prisma } from '@prisma/client'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()
    return new Response(
      JSON.stringify(
        await prisma.service.findMany({
          include: {
            solution: true,
            subscriptions: {
              include: {
                user: true,
              },
            },
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
  const randomCode = Math.random().toString(32).substr(2, 12).toUpperCase()

  try {
    await prisma.$connect()
    return await request
      .json()
      .then(async (inputs: ServiceCreateSchemaType) => {
        if (await ServiceCreateSchema.parseAsync(inputs)) {
          const { solutionId } = inputs

          const solution = await prisma.solution.findFirst({
            where: {
              id: solutionId,
            },
          })
          if (!solution)
            return new Response(
              JSON.stringify('A solução informada não existe'),
              { status: 404 },
            )

          delete inputs?.solutionId
          const data: Prisma.ServiceCreateInput = {
            ...inputs,
            solution: {
              connect: {
                id: solution?.id!,
              },
            },
          }
          return new Response(
            JSON.stringify(await prisma.service.create({ data })),
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
