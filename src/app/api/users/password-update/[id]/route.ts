import { prisma } from '@/libraries/prisma'
import {
  UserPasswordUpdateSchema,
  UserPasswordUpdateSchemaType,
} from '@/schemas/user'
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
      .then(async (inputs: UserPasswordUpdateSchemaType) => {
        if (await UserPasswordUpdateSchema.parseAsync(inputs)) {
          const { password } = inputs

          const data: Prisma.UserUpdateInput = {
            passHash: await hash(password, 10),
          }
          await prisma.user.update({ where: { id }, data })

          return new Response(JSON.stringify('the password has been updated'))
        }
      })
  } catch (error: any) {
    return new Response(JSON.stringify(error?.message || error), {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
