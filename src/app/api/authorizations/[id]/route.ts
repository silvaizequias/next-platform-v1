import { prisma } from '@/libraries/prisma'
import { UpdateAuthorizationDTO, UpdateAuthorizationDTOType } from '../dto'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'
import { Prisma } from '@prisma/client'

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
          await prisma.authorization.findFirst({
            where: { id: id, softDeleted: false },
            include: {
              solution: true,
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
      const inputs: UpdateAuthorizationDTOType = await request.json()
      if (await UpdateAuthorizationDTO.parseAsync(inputs)) {
        const { solutionId } = inputs
        delete inputs?.solutionId

        if (!solutionId) {
          await prisma.authorization.update({
            where: { id: id, softDeleted: false },
            data: { ...inputs },
          })
          return new Response(
            JSON.stringify('as informações de autorização	foram atualizadas'),
            { status: 201 },
          )
        }

        const solution = await prisma.solution.findFirst({
          where: { id: solutionId, softDeleted: false },
        })
        if (!solution)
          return new Response(JSON.stringify('a solução não existe'), {
            status: 404,
          })

        const data: Prisma.AuthorizationUpdateInput = {
          ...inputs,
          solution: {
            update: {
              apiUrl: solution.apiUrl,
            },
          },
        }
        await prisma.authorization.update({ where: { id: id }, data })

        return new Response(
          JSON.stringify('as informações de autorização	foram atualizadas'),
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
