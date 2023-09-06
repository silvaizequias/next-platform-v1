import { AuthSignInSchema, AuthSignInSchemaType } from '@/schemas/auth'
import { prisma } from '@/libraries/prisma'
import { compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'

export const POST = async (request: Request) => {
  try {
    await prisma.$connect()
    return await request.json().then(async (inputs: AuthSignInSchemaType) => {
      if (await AuthSignInSchema.parseAsync(inputs)) {
        const { phone, email } = inputs

        const user = await prisma.user.findFirst({
          where: {
            phone: phone,
            email: email,
          },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            isActive: true,
          },
        })
        if (!user)
          return new Response(
            JSON.stringify(
              `O número celular ${phone} e e-mail ${email} não existe em nosso sistema!`,
            ),
            { status: 404 },
          )

        const encryptedToken = jwt.sign(
          {
            phone,
            role: user.role,
            iat: Math.floor(Date.now() / 1000) - 30,
            exp: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
          },
          process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string,
        )

        return new Response(
          JSON.stringify({
            expiresIn: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
            Authorization: encryptedToken,
            data: user,
          }),
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
