import { prisma } from '@/libraries/prisma'
import {
  AuthPasswordResetSchema,
  AuthPasswordResetSchemaType,
} from '@/types/auth/schema'
import { sendPasswordResetMessage } from '@/utils/send-message'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export async function POST(request: Request) {
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()

  try {
    const inputs: AuthPasswordResetSchemaType = await request.json()
    if (await AuthPasswordResetSchema.parseAsync(inputs)) {
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
      await sendPasswordResetMessage({
        emailTo: email,
        name: user?.name,
        password: randomCode,
        phoneTo: `+55${phone}`,
      })

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
