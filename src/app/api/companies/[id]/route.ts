import { prisma } from '@/libraries/prisma'
import { CompanyUpdateSchema, CompanyUpdateSchemaType } from '@/schemas/company'
import { Prisma } from '@prisma/client'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  try {
    await prisma?.$disconnect()
    return new Response(
      JSON.stringify(
        await prisma.company.findFirst({
          where: { id },
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

export const POST = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  try {
    await prisma?.$disconnect()
    return await request
      .json()
      .then(async (inputs: CompanyUpdateSchemaType) => {
        if (await CompanyUpdateSchema.parseAsync(inputs)) {
          const { userId } = inputs
          delete inputs?.userId

          if (!userId)
            return new Response(
              JSON.stringify(
                await prisma.company.update({
                  where: { id },
                  data: inputs,
                }),
              ),
            )

          const user = await prisma.user.findFirst({
            where: { id: userId },
          })
          if (!user)
            return new Response('O usuário não foi encontrado', { status: 404 })

          const data: Prisma.CompanyUpdateInput = {
            ...inputs,
            user: {
              update: {
                id: user?.id!,
              },
            },
          }
          return new Response(
            JSON.stringify(
              await prisma.company.update({ where: { id }, data }),
            ),
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
