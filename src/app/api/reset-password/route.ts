import { prisma } from '@/libraries/prisma'
import { sendResetPasswordEmail } from '@/libraries/sendgrid/templates'
import { SendGridTemplateProps } from '@/libraries/sendgrid/types'
import { sendResetPasswordSms } from '@/libraries/twilio/templates'
import { TwilioTemplateProps } from '@/libraries/twilio/types'
import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from '@/types/auth/schema'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'

export const POST = async (
  request: Request,
): Promise<ResetPasswordSchemaType | any> => {
  const randomCode = Math.random().toString(32).substr(2, 12)
  const inputs: ResetPasswordSchemaType = await request.json()
  try {
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

      const sendEmail: SendGridTemplateProps = {
        name: user?.name!,
        password: randomCode!,
        phone: user?.phone!,
        email: user?.email!,
      }
      await sendResetPasswordEmail(sendEmail)

      const sendSms: TwilioTemplateProps = {
        name: user?.name!,
        password: randomCode!,
        phone: user?.phone!,
      }
      await sendResetPasswordSms(sendSms)

      return new Response(
        `uma nova senha foi enviada para o e-mail ${email}!`,
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new Response(error?.message! || error!, { status: 400 })
  }
}
