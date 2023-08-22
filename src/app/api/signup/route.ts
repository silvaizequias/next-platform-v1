import { AuthSignUpSchema, AuthSignUpSchemaType } from '@/schemas/auth'
import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'

export const POST = async (request: Request) => {
  const randomToken = Math.random().toString(32).substr(2, 6).toUpperCase()
  const randomPassword = Math.random().toString(32).substr(2, 12)

  try {
    await prisma.$connect()
    return await request.json().then(async (inputs: AuthSignUpSchemaType) => {
      if (await AuthSignUpSchema.validate(inputs)) {
        const { phone, email } = inputs
        const userPhone = await prisma.user.findFirst({
          where: { phone: phone },
        })
        if (userPhone)
          return new Response('phone already exists', { status: 409 })

        const userEmail = await prisma.user.findFirst({
          where: { email: email },
        })
        if (userEmail)
          return new Response('phone already exists', { status: 409 })

        const data: Prisma.UserCreateInput = {
          ...inputs,
          passToken: randomToken,
          passHash: await hash(randomPassword, 10),
        }
        console.log(randomPassword)

        return new Response(JSON.stringify(await prisma.user.create({ data })))
      }
    })
  } catch (error: any) {
    return new Response(JSON.stringify(error?.message || error), {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
