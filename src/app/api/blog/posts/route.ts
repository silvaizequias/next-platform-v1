import { prisma } from '@/libraries/prisma'
import { CreatePostSchema, CreatePostSchemaType } from '@/schemas/post'
import { Prisma } from '@prisma/client'

export const GET = async (request: Request) => {
  try {
    await prisma?.$connect()

    return new Response(
      JSON.stringify(
        await prisma.post.findMany({
          orderBy: {
            updatedAt: 'desc',
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
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

export const POST = async (request: Request) => {
  try {
    await prisma?.$connect()

    return await request.json().then(async (inputs: CreatePostSchemaType) => {
      if (await CreatePostSchema.parseAsync(inputs)) {
        const { userId, title } = inputs
        delete inputs?.userId

        const user = await prisma.user.findFirst({ where: { id: userId } })
        if (!user)
          return new Response('O usuário não foi encontrado', {
            status: 404,
          })

        const slug = title
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/&/g, '-and-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '')

        const data: Prisma.PostCreateInput = {
          ...inputs,
          slug: slug,
          user: {
            connect: {
              id: user?.id!,
            },
          },
        }

        return new Response(JSON.stringify(await prisma.post.create({ data })))
      }
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
