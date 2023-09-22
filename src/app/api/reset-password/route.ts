import { prisma } from '@/libraries/prisma'
import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from '@/types/auth/schema'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'

export const POST = async (request: Request): Promise<ResetPasswordSchemaType | any> => {
  const randomCode = Math.random().toString(32).substr(2, 12)
  try {
    await prisma.$connect()

    return await request
      .json()
      .then(async (inputs: ResetPasswordSchemaType) => {
        if (await ResetPasswordSchema.parseAsync(inputs)) {
          const { phone, email } = inputs

          const user = await prisma.user.findFirst({
            where: {
              phone: phone,
              email: email,
            },
          })
          if (!user)
            return new Response(
              `a conta com o email ${email} e telefone ${phone} não existe no sistema!`,
              { status: 404 },
            )

          const data: Prisma.UserUpdateInput = {
            passHash: await hash(randomCode!, 10),
          }
          await prisma.user.update({ where: { phone }, data })

          return new Response(
            `uma nova senha foi enviada para o e-mail ${email}!`,
          )
        }
      })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message! || error!, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
