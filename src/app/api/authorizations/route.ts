import { prisma } from '@/libraries/prisma'
import { CreateAuthorizationDTO, CreateAuthorizationDTOType } from './dto'
import { randomUUID } from 'crypto'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  try {
    if (session && session.user.profile == 'MASTER')
      return new Response(
        JSON.stringify(
          await prisma.authorization.findFirst({
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
      const inputs: CreateAuthorizationDTOType = await request.json()
      if (await CreateAuthorizationDTO.parseAsync(inputs)) {
        const keyGeneration = randomUUID()

        await prisma.authorization.create({
          data: { ...inputs, apiKey: keyGeneration },
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
