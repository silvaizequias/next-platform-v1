import { AuthSignUpSchema, AuthSignUpSchemaType } from '@/schemas/auth'
import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'
import { welcomeEmailTemlate } from '@/templates/email'
import { welcomeSmsTemplate } from '@/templates/sms'

export const POST = async (request: Request) => {
  const randomToken = Math.random().toString(32).substr(2, 6).toUpperCase()
  const randomPassword = Math.random().toString(32).substr(2, 12)

  try {
    await prisma.$connect()
    return await request.json().then(async (inputs: AuthSignUpSchemaType) => {
      if (await AuthSignUpSchema.parseAsync(inputs)) {
        const { name, phone, email } = inputs
        const userPhone = await prisma.user.findFirst({
          where: { phone: phone },
        })
        if (userPhone)
          return new Response(
            JSON.stringify(
              `O número celular ${phone} já existe em nosso sistema!`,
            ),
            { status: 409 },
          )

        const userEmail = await prisma.user.findFirst({
          where: { email: email },
        })
        if (userEmail)
          return new Response(
            JSON.stringify(`O e-mail ${email} já existe em nosso sistema!`),
            {
              status: 409,
            },
          )

        const data: Prisma.UserCreateInput = {
          ...inputs,
          passToken: randomToken,
          passHash: await hash(randomPassword, 10),
        }

        await prisma.user.create({ data })

        const sendWelcomeEmail = {
          name: name,
          email: email,
          password: randomPassword,
          phone: phone,
        }
        await welcomeEmailTemlate(sendWelcomeEmail)

        const sendWelcomeSms = {
          name: name,
          password: randomPassword,
          phone: phone,
        }
        await welcomeSmsTemplate(sendWelcomeSms)

        return new Response(
          JSON.stringify(
            `A conta foi criada e as informações de acesso foram enviadas para o e-mail ${email} e celular ${phone}`,
          ),
        )
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
