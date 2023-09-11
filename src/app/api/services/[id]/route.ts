import { prisma } from '@/libraries/prisma'
import { ServiceUpdateSchema, ServiceUpdateSchemaType } from '@/schemas/service'
import { Prisma } from '@prisma/client'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.service.findFirst({
          where: { id },
          include: {
            solution: true,
            subscriptions: {
              include: {
                user: true
              }
            },
          },
        }),
      ),
    )
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
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
      .then(async (inputs: ServiceUpdateSchemaType) => {
        if (await ServiceUpdateSchema.parseAsync(inputs)) {
          const { solutionId } = inputs
          delete inputs?.solutionId
          if (!solutionId) {
            await prisma.service.update({ where: { id }, data: inputs })
          }

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

          const data: Prisma.ServiceUpdateInput = {
            ...inputs,
            solution: {
              update: {
                id: solution?.id!,
              },
            },
          }

          return new Response(
            JSON.stringify(
              await prisma.service.update({ where: { id }, data }),
            ),
          )
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
