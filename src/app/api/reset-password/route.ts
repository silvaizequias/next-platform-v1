import { prisma } from '@/libraries/prisma'
import { AuthResetPassword, AuthResetPasswordType } from '@/schemas/auth'
import { resetPasswordEmailTemplate } from '@/templates/email'
import { ResetPasswordEmailTemplateProps } from '@/templates/email/types'
import { resetPasswordSmsTemplate } from '@/templates/sms'
import { WelcomeSmsTemplateProps } from '@/templates/sms/types'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'

export const POST = async (request: Request) => {
  const randomCode = Math.random().toString(32).substr(2, 12)
  try {
    await prisma.$connect()
    return await request.json().then(async (inputs: AuthResetPasswordType) => {
      if (await AuthResetPassword.parseAsync(inputs)) {
        const { email, phone } = inputs

        const user = await prisma.user.findFirst({
          where: {
            email: email,
            phone: phone,
          },
        })
        if (!user)
          return new Response(
            `o email ${email} ou o telefone ${phone} não existem no sistema!`,
            { status: 404 },
          )

        const data: Prisma.UserUpdateInput = {
          passHash: await hash(randomCode!, 10),
        }
        await prisma.user.update({ where: { phone }, data })

        const sendEmail: ResetPasswordEmailTemplateProps = {
          name: user?.name!,
          password: randomCode!,
          phone: user?.phone!,
          email: user?.email!,
        }
        await resetPasswordEmailTemplate(sendEmail)

        const sendSms: WelcomeSmsTemplateProps = {
          name: user?.name!,
          password: randomCode!,
          phone: user?.phone!,
        }
        await resetPasswordSmsTemplate(sendSms)

        return new Response(
          JSON.stringify(
            'uma nova senha foi redefinida e enviada para o e-mail ${email}!',
          ),
        )
      }
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
