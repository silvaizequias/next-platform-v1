import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { prisma } from '@/libraries/prisma'
import {
  UserPasswordUpdateDTO,
  UserPasswordUpdateDTOType,
} from '@/dto/user.dto'
import { compareSync, hashSync } from 'bcrypt'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const id = session?.user?.id
  try {
    if (!session)
      return new Response(JSON.stringify('acesso não autorizado'), {
        status: 403,
      })

    const inputs: UserPasswordUpdateDTOType = await request.json()
    if (await UserPasswordUpdateDTO.parseAsync(inputs)) {
      const { password, newPassword } = inputs

      const user = await prisma.user.findFirst({
        where: { id: id },
      })
      if (!user)
        return new Response(JSON.stringify('usuário não encontrado'), {
          status: 404,
        })

      if (!user?.passHash)
        return new Response(
          JSON.stringify('não há nenhuma senha definida para este usuário'),
          { status: 404 },
        )

      const comparePass = compareSync(password!, user?.passHash!)
      if (!comparePass)
        return new Response(JSON.stringify('a senha atual está incorreta'), {
          status: 401,
        })

      const data: Prisma.UserUpdateInput = {
        passHash: hashSync(newPassword, 10),
      }
      await prisma.user.update({ where: { id: id }, data })

      return new Response(JSON.stringify('a senha foi atualizada'), {
        status: 201,
      })
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
