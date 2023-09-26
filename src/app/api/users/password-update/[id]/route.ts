import { prisma } from '@/libraries/prisma'
import {
  UserPasswordUpdateSchema,
  UserPasswordUpdateSchemaType,
} from '@/types/user/schema'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'
import { compareSync } from 'bcrypt'

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<any> => {
  const { id } = params
  try {
    await prisma.$connect()

    return await request
      .json()
      .then(async (inputs: UserPasswordUpdateSchemaType) => {
        if (await UserPasswordUpdateSchema.parseAsync(inputs)) {
          const { password, newPassword } = inputs

          const user = await prisma.user.findFirst({
            where: { id: id, softDeleted: false },
          })
          if (!user)
            return new Response(`esta conta não existe no sistema!`, {
              status: 404,
            })

          const passwordValidate = compareSync(password, user?.passHash!)
          if (!passwordValidate) new Response('senha inválida', { status: 403 })

          const data: Prisma.UserUpdateInput = {
            passHash: await hash(newPassword, 10),
          }
          await prisma.user.update({ where: { id }, data })

          return new Response('a senha foi atualizada!', { status: 201 })
        }
      })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message! || error!, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
