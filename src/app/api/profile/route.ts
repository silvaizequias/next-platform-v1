import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'
import { ProfileUpdateDTO, ProfileUpdateDTOType } from '@/dto/profile.dto'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  const id = session?.user?.id
  try {
    if (!session)
      return new Response(JSON.stringify('acesso não autorizado'), {
        status: 403,
      })

    return new Response(
      JSON.stringify(
        await prisma.user.findFirst({
          where: { id: id },
          include: {
            organizations: true,
            subscriptions: true,
          },
        }),
      ),
      {
        status: 200,
      },
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const id = session?.user?.id
  try {
    if (!session)
      return new Response(JSON.stringify('acesso não autorizado'), {
        status: 403,
      })

    const inputs: ProfileUpdateDTOType = await request.json()
    if (await ProfileUpdateDTO.parseAsync(inputs)) {
      const user = await prisma.user.findFirst({
        where: { id: id },
      })
      if (!user)
        return new Response(JSON.stringify('usuário não encontrado'), {
          status: 404,
        })

      const data: Prisma.UserUpdateInput = {
        ...inputs,
      }
      await prisma.user.update({ where: { id: id }, data })

      return new Response(
        JSON.stringify('as informações do perfil foram atualizadas'),
        {
          status: 201,
        },
      )
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
