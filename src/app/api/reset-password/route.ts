import { prisma } from '@/libraries/prisma'
import { AuthResetPassword, AuthResetPasswordType } from '@/schemas/auth'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'

export const POST = async (request: Request) => {
  const randomToken = Math.random().toString(32).substr(2, 6).toUpperCase()
  const randomPassword = Math.random().toString(32).substr(2, 12)

  try {
    return await request.json().then(async (inputs: AuthResetPasswordType) => {
      if (AuthResetPassword.validateSync(inputs)) {
        const { phone, email } = inputs
        const user = await prisma.user.findFirst({
          where: { phone: phone, email: email },
        })
        if (!user)
          return new Response('phone our email dont valid', { status: 401 })

        const data: Prisma.UserUpdateInput = {
          passToken: randomToken,
          passHash: await hash(randomPassword, 10),
        }
        console.log(randomPassword)

        return new Response(
          JSON.stringify(await prisma.user.update({ where: { phone }, data })),
        )
      }
    })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
