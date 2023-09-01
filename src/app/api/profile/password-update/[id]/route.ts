import { prisma } from '@/libraries/prisma'
import {
  ProfilePasswordUpdateSchema,
  ProfilePasswordUpdateSchemaType,
} from '@/schemas/profile'
import { Prisma } from '@prisma/client'
import { compareSync, hash } from 'bcrypt'

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id
  try {
    await prisma.$connect()
    return await request
      .json()
      .then(async (inputs: ProfilePasswordUpdateSchemaType) => {
        if (await ProfilePasswordUpdateSchema.parseAsync(inputs)) {
          const { oldPassword, password } = inputs

          const user = await prisma.user.findFirst({
            where: { id },
          })
          if (!user) return new Response('Esta conta não existe no sistema!', { status: 404 })

          const comparePassword = compareSync(
            oldPassword,
            user?.passHash as string,
          )
          if (!comparePassword)
            return new Response(JSON.stringify('A senha informada não está correta e não poderá ser validada!'))

          const data: Prisma.UserUpdateInput = {
            passHash: await hash(password, 10),
          }
          await prisma.user.update({ where: { id }, data })

          return new Response(JSON.stringify('Sua senha foi atualizada!'))
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
