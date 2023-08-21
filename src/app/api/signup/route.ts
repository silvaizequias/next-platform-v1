import { AuthSignUpSchema, AuthSignUpSchemaType } from '@/schemas/auth'
import prisma from '@/libraries/prisma'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'

export const POST = async (request: Request) => {
  const randomToken = Math.random().toString(32).substr(2, 6).toUpperCase()
  const randomPassword = Math.random().toString(32).substr(2, 12)
  console.log(randomPassword)

  try {
    await prisma.$connect()
    return request.json().then(async (inputs: AuthSignUpSchemaType) => {
      if (await AuthSignUpSchema.validate(inputs)) {
        const data: Prisma.UserCreateInput = {
          ...inputs,
          passToken: randomToken,
          passHash: await hash(randomPassword, 10),
        }

        return new Response(JSON.stringify(await prisma.user.create({ data })))
      }
    })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
