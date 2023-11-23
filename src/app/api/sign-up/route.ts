import { prisma } from '@/libraries/prisma'
import { AuthSignUpSchema, AuthSignUpSchemaType } from '@/types/auth/schema'
import { sendWelcomeMessage } from '@/utils/send-message'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export async function POST(request: Request) {
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()

  try {
    const inputs: AuthSignUpSchemaType = await request.json()
    if (await AuthSignUpSchema.parseAsync(inputs)) {
      const { email, name, phone, password } = inputs
      delete inputs?.password

      const userEmail = await prisma.user.findFirst({
        where: { email: email },
      })

      const userPhone = await prisma.user.findFirst({
        where: { phone: phone },
      })

      if (userEmail || userPhone)
        return new Response(
          JSON.stringify(
            `o e-mail ${email} ou o telefone ${phone} já estão em uso`,
          ),
          {
            status: 409,
          },
        )

      const data: Prisma.UserCreateInput = {
        ...inputs,
        passHash: hashSync(password || randomCode, 10),
      }
      await prisma.user.create({ data })
      await sendWelcomeMessage({
        emailTo: email,
        name: name,
        password: password || randomCode,
        phoneTo: phone,
      })

      return new Response(JSON.stringify('boas vindas a DEDICADO DIGITAL'), {
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
