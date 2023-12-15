import { prisma } from '@/libraries/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'
import { CreateSubdomainDTO, CreateSubdomainDTOType } from './dto'
import { slugify } from '@/utils/slugify'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  try {
    if (session && session.user.profile == 'MASTER')
      return new Response(
        JSON.stringify(
          await prisma.subdomain.findFirst({
            where: { softDeleted: false },
          }),
        ),
      )

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

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  try {
    if (session && session.user.profile == 'MASTER') {
      const inputs: CreateSubdomainDTOType = await request.json()
      if (await CreateSubdomainDTO.parseAsync(inputs)) {
        const { name } = inputs
        await prisma.subdomain.create({
          data: { ...inputs, slug: slugify(name) },
        })

        return new Response(JSON.stringify('o subdomínio foi criado'), {
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
