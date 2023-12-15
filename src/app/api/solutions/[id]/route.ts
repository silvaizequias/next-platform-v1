import { prisma } from '@/libraries/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'
import { UpdateSolutionDTO, UpdateSolutionDTOType } from '../dto'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  const session = await getServerSession(authOptions)
  try {
    if (session)
      return new Response(
        JSON.stringify(
          await prisma.solution.findFirst({
            where: { id: id, softDeleted: false },
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

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    const session = await getServerSession(authOptions)
    if (session && session?.user.profile == 'MASTER') {
      const inputs: UpdateSolutionDTOType = await request.json()
      if (await UpdateSolutionDTO.parseAsync(inputs)) {
        await prisma.solution.update({ where: { id: id }, data: { ...inputs } })

        return new Response(
          JSON.stringify('as informações da solução	foram atualizadas'),
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
