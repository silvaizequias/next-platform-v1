import { prisma } from '@/libraries/prisma'
import { AuthResetPassword, AuthResetPasswordType } from '@/schemas/auth'
import { resetPasswordEmailTemplate } from '@/templates/email'
import { resetPasswordSmsTemplate } from '@/templates/sms'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'

export const POST = async (request: Request) => {
  const randomToken = Math.random().toString(32).substr(2, 6).toUpperCase()
  const randomPassword = Math.random().toString(32).substr(2, 12)

  try {
    return await request.json().then(async (inputs: AuthResetPasswordType) => {
      if (await AuthResetPassword.parseAsync(inputs)) {
        const { phone, email } = inputs

        const user = await prisma.user.findFirst({
          where: { phone: phone, email: email },
        })
        if (!user)
          return new Response('O número de celular ou email são inválidos para esta solicitação!')

        const data: Prisma.UserUpdateInput = {
          passToken: randomToken,
          passHash: await hash(randomPassword, 10),
        }
        await prisma.user.update({ where: { phone }, data })

        const sendResetPasswordEmail = {
          name: user?.name!,
          email: email,
          password: randomPassword,
          phone: phone,
        }
        await resetPasswordEmailTemplate(sendResetPasswordEmail)

        const sendResetPasswordSms = {
          name: user?.name!,
          password: randomPassword,
          phone: phone,
        }
        resetPasswordSmsTemplate(sendResetPasswordSms)

        return new Response(
          JSON.stringify(
            `A senha foi redefinida e enviada para o e-mail ${email} e celular ${phone}`,
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
