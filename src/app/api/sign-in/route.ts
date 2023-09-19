import { UserType } from '@/views/control/users/types'
import { AuthSignInSchema, AuthSignInSchemaType } from '@/schemas/auth'
import { prisma } from '@/libraries/prisma'
import jwt from 'jsonwebtoken'
import { compareSync } from 'bcrypt'

export const POST = async (request: Request) => {
  try {
    await prisma.$connect()
    return await request.json().then(async (inputs: AuthSignInSchemaType) => {
      if (await AuthSignInSchema.parseAsync(inputs)) {
        const { phone, password } = inputs

        const user = await prisma.user.findFirst({
          where: {
            phone: phone,
          },
          include: {
            services: {
              select: {
                serviceId: true,
                isActive: true,
                role: true
              },
            },
          },
        })
        if (!user)
          return new Response(
            JSON.stringify(
              `O número celular ${phone} não existe em nosso sistema!`,
            ),
            { status: 404 },
          )

        const passHash = compareSync(password, user?.passHash!)
        if (!passHash)
          new Response(JSON.stringify('senha inválida'), { status: 403 })

        const encryptedToken = jwt.sign(
          {
            phone,
            profile: user?.profile!,
            services: user?.services!,
            iat: Math.floor(Date.now() / 1000) - 30,
            exp: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
          },
          process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string,
        )

        return new Response(
          JSON.stringify({
            expiresIn: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
            Authorization: encryptedToken,
            data: {
              id: user?.id!,
              name: user?.name!,
              email: user?.email!,
              phone: user.phone!,
              profile: user?.profile!,
              isActive: user?.isActive!,
              services: user?.services!,
            },
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
