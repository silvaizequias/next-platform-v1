import { prisma } from '@/libraries/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'
import { Prisma } from '@prisma/client'
import { PostUpdateDTO, PostUpdateDTOType } from '../dto'
import { slugify } from '@/utils/slugify'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(
      JSON.stringify(
        await prisma.post.findFirst({
          where: { id: id, softDeleted: false },
        }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    const session = await getServerSession(authOptions)
    if (session && session?.user.profile == 'MASTER') {
      const inputs: PostUpdateDTOType = await request.json()
      if (await PostUpdateDTO.parseAsync(inputs)) {
        const { author, title } = inputs

        if (title) {
          const slug = slugify(title)
          await prisma.post.update({
            where: { id: id },
            data: {
              ...inputs,
              slug: slug,
              author: author || session.user?.name!,
            },
          })
          return new Response(
            JSON.stringify('as informações da postagem	foram atualizadas'),
            { status: 201 },
          )
        }

        const data: Prisma.PostUpdateInput = {
          ...inputs,
        }
        await prisma.post.update({ where: { id: id }, data })

        return new Response(
          JSON.stringify('as informações da postagem	foram atualizadas'),
          { status: 201 },
        )
      }
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
