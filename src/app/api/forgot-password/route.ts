import { prisma } from '@/libraries/prisma'
import {
  AuthForgotPasswordSchema,
  AuthForgotPasswordSchemaType,
} from '@/types/auth/schema'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export async function POST(request: Request) {
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()

  try {
    const inputs: AuthForgotPasswordSchemaType = await request.json()
    if (await AuthForgotPasswordSchema.parseAsync(inputs)) {
      const { email, phone } = inputs

      const user = await prisma.user.findFirst({
        where: { email: email, phone: phone },
      })
      if (!user)
        return new Response(
          JSON.stringify('você não está registrado no sistema'),
          {
            status: 404,
          },
        )

      const data: Prisma.UserUpdateInput = {
        ...inputs,
        passHash: hashSync(randomCode, 10),
      }
      await prisma.user.update({ where: { phone }, data })

      return new Response(
        JSON.stringify('a senha foi redefinida e enviada para o seu e-mail'),
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
