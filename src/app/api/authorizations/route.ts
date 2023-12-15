import { prisma } from '@/libraries/prisma'
import { CreateAuthorizationDTO, CreateAuthorizationDTOType } from './dto'
import { randomUUID } from 'crypto'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  try {
    if (session && session.user.profile == 'MASTER')
      return new Response(
        JSON.stringify(
          await prisma.authorization.findFirst({
            where: { softDeleted: false },
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

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  try {
    if (session && session.user.profile == 'MASTER') {
      const inputs: CreateAuthorizationDTOType = await request.json()
      if (await CreateAuthorizationDTO.parseAsync(inputs)) {
        const { solutionId } = inputs
        delete inputs?.solutionId

        const keyGeneration = randomUUID()

        const solution = await prisma.solution.findFirst({
          where: { id: solutionId, softDeleted: false },
        })
        if (!solution)
          return new Response(JSON.stringify('a solução não existe'), {
            status: 404,
          })

        const data: Prisma.AuthorizationCreateInput = {
          ...inputs,
          apiKey: keyGeneration,
          solution: {
            connect: {
              id: solutionId,
            },
          },
        }
        await prisma.authorization.create({
          data,
        })

        return new Response(
          JSON.stringify('a chave api de autorização foi criada'),
          { status: 201 },
        )
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
