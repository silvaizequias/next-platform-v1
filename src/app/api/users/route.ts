import { prisma } from '@/libraries/prisma'
import { sendWelcomeEmail } from '@/libraries/sendgrid/templates'
import { SendGridTemplateProps } from '@/libraries/sendgrid/types'
import { sendWelcomeSms } from '@/libraries/twilio/templates'
import { TwilioTemplateProps } from '@/libraries/twilio/types'
import { UserCreateSchema, UserCreateSchemaType } from '@/types/user/schema'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  try {
    return new NextResponse(
      JSON.stringify(
        await prisma.user.findMany({
          where: { softDeleted: false },
          include: {
            subscriptions: true,
            organizations: true,
            orgs: {
              select: {
                role: true,
                isAvaliable: true,
                organization: {
                  select: {
                    id: true,
                    name: true,
                    cnpj: true,
                  },
                },
              },
            },
          },
        }),
      ),
    )
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}

export const POST = async (
  request: Request,
): Promise<UserCreateSchemaType | any> => {
  const randomCode = Math.random().toString(32).substr(2, 12)
  const inputs: UserCreateSchemaType = await request.json()

  try {
    if (await UserCreateSchema.parseAsync(inputs)) {
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
        passHash:  bcrypt.hashSync(password || randomCode!, 10),
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
