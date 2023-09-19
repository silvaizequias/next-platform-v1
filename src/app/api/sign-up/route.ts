import { AuthSignUpSchema, AuthSignUpSchemaType } from '@/schemas/auth'
import { prisma } from '@/libraries/prisma'
import { WelcomeEmailTemplateProps } from '@/templates/email/types'
import { welcomeEmailTemlate } from '@/templates/email'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'
import { WelcomeSmsTemplateProps } from '@/templates/sms/types'
import { welcomeSmsTemplate } from '@/templates/sms'

export const POST = async (request: Request) => {
  const randomCode = Math.random().toString(32).substr(2, 12)
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
            { status: 409 },
          )

        const data: Prisma.UserCreateInput = {
          ...inputs,
          passHash: await hash(randomCode!, 10),
        }
        await prisma.user.create({ data })

        const sendEmail: WelcomeEmailTemplateProps = {
          name: name!,
          password: randomCode!,
          phone: phone!,
          email: email!,
        }
        await welcomeEmailTemlate(sendEmail)

        const sendSms: WelcomeSmsTemplateProps = {
          name: name!,
          password: randomCode!,
          phone: phone!,
        }
        await welcomeSmsTemplate(sendSms)

        return new Response(
          JSON.stringify(
            `A conta foi criada e a senha enviada para o email ${email}!`,
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
