import { prisma } from '@/libraries/prisma'
import { CompanyCreateSchema, CompanyCreateSchemaType } from '@/schemas/company'
import { Prisma } from '@prisma/client'

export const GET = async (request: Request) => {
  try {
    await prisma?.$disconnect()
    return new Response(
      JSON.stringify(
        await prisma.company.findMany({
          include: {
            user: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    await prisma?.$disconnect()
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prisma?.$disconnect()
  }
}

export const POST = async (request: Request) => {
  try {
    await prisma.$connect()
    return await request
      .json()
      .then(async (inputs: CompanyCreateSchemaType) => {
        if (await CompanyCreateSchema.parseAsync(inputs)) {
          const { userId } = inputs

          const user = await prisma.user.findFirst({
            where: { id: userId },
          })
          if (!user)
            return new Response('O usuário não foi encontrado', { status: 404 })

          delete inputs?.userId

          const data: Prisma.CompanyCreateInput = {
            ...inputs,
            user: {
              connect: {
                id: user?.id!,
              },
            },
          }
          return new Response(
            JSON.stringify(await prisma.company.create({ data })),
          )
        }
      })
  } catch (error: any) {
    await prisma?.$disconnect()
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prisma?.$disconnect()
  }
}
