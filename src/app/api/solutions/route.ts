import { prisma } from '@/libraries/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'
import { CreateSolutionDTO, CreateSolutionDTOType } from './dto'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  try {
    if (session && session.user.profile == 'MASTER')
      return new Response(
        JSON.stringify(
          await prisma.solution.findFirst({
            where: { softDeleted: false },
            include: {
              authorizations: true,
            },
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
      const inputs: CreateSolutionDTOType = await request.json()
      if (await CreateSolutionDTO.parseAsync(inputs)) {
        await prisma.solution.create({
          data: {...inputs},
        })

        return new Response(JSON.stringify('a solução foi criada'), {
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
