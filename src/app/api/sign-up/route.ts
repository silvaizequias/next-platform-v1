import { prisma } from '@/libraries/prisma'
import { AuthSignUpSchema, AuthSignUpSchemaType } from '@/types/auth/schema'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export async function POST(request: Request) {
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()

  try {
    const inputs: AuthSignUpSchemaType = await request.json()
    if (await AuthSignUpSchema.parseAsync(inputs)) {
      const { email, phone, password } = inputs
      delete inputs.password

      const user = await prisma.user.findFirst({
        where: { email: email, phone: phone },
      })
      if (user)
        return new Response('você já está registrado no sistema', {
          status: 409,
        })

      const data: Prisma.UserCreateInput = {
        ...inputs,
        passHash: hashSync(password || randomCode, 10),
      }

      return new Response(JSON.stringify(await prisma.user.create({ data })), {
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
