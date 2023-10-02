import { prisma } from '@/libraries/prisma'
import { sendWelcomeEmail } from '@/libraries/sendgrid/templates'
import { SendGridTemplateProps } from '@/libraries/sendgrid/types'
import { sendWelcomeSms } from '@/libraries/twilio/templates'
import { TwilioTemplateProps } from '@/libraries/twilio/types'
import { AuthSignUpSchema, AuthSignUpSchemaType } from '@/types/auth/schema'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'

export const POST = async (
  request: Request,
): Promise<AuthSignUpSchemaType | any> => {
  const randomCode = Math.random().toString(32).substr(2, 12)
  const inputs: AuthSignUpSchemaType = await request.json()

  try {
    if (await AuthSignUpSchema.parseAsync(inputs)) {
      const { name, phone, email, password } = inputs
      delete inputs?.password

      const user = await prisma.user.findFirst({
        where: {
          email: email,
          phone: phone,
        },
      })
      if (user)
        return new NextResponse(`esta conta já existe em nosso sistema!`, {
          status: 409,
        })

      const data: Prisma.UserCreateInput = {
        ...inputs,
        passHash: await hash(password || randomCode!, 10),
      }
      await prisma.user.create({ data })

      const sendEmail: SendGridTemplateProps = {
        name: name!,
        password: randomCode!,
        phone: phone!,
        email: email!,
      }
      await sendWelcomeEmail(sendEmail)

      const sendSms: TwilioTemplateProps = {
        name: name!,
        password: randomCode!,
        phone: phone!,
      }
      await sendWelcomeSms(sendSms)

      return new NextResponse(
        `A conta foi criada e a senha enviada para o email ${email}!`,
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}
