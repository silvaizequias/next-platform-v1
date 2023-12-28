import { prisma } from '@/libraries/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'
import { Prisma } from '@prisma/client'
import { CreatePostDTO, CreatePostDTOType } from './dto'
import { slugify } from '@/utils/slugify'

export async function GET(request: Request) {
  try {
    return new Response(
      JSON.stringify(
        await prisma.post.findMany({
          where: { softDeleted: false },
          orderBy: { createdAt: 'desc' },
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

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  try {
    if (session && session.user.profile == 'MASTER') {
      const inputs: CreatePostDTOType = await request.json()
      if (await CreatePostDTO.parseAsync(inputs)) {
        const { author, title } = inputs
        const slug = slugify(title)

        const data: Prisma.PostCreateInput = {
          ...inputs,
          slug: slug,
          author: author || session.user?.name!,
        }
        await prisma.post.create({
          data,
        })

        return new Response(JSON.stringify('a postagem foi criada'), {
          status: 201,
        })
      }
    }
    return new Response(JSON.stringify('acesso não autorizado'), {
      status: 403,
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
