import { prisma } from '@/libraries/prisma'
import { UpdateArticleSchema, UpdateArticleSchemaType } from '@/schemas/article'
import { Prisma } from '@prisma/client'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  try {
    await prisma?.$connect()

    return new Response(
      JSON.stringify(
        await prisma.article.findFirst({
          where: { id },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
                email: true,
                phone: true,
                profile: true,
              },
            },
          },
        }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  try {
    await prisma?.$connect()

    return await request
      .json()
      .then(async (inputs: UpdateArticleSchemaType) => {
        if (await UpdateArticleSchema.parseAsync(inputs)) {
          const { userId } = inputs
          delete inputs?.userId

          if (!userId) {
            return await prisma.article.update({ where: { id }, data: inputs })
          }

          const user = await prisma.user.findFirst({ where: { id: userId } })
          if (!user)
            return new Response('O usuário não foi encontrado', {
              status: 404,
            })

          const data: Prisma.ArticleUpdateInput = {
            ...inputs,
            user: {
              update: {
                id: user?.id!,
              },
            },
          }

          return new Response(
            JSON.stringify(
              await prisma.article.update({ where: { id }, data }),
            ),
          )
        }
      })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
