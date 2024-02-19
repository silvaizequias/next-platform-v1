import { env } from '@/environments'
import { prisma } from '@/libraries/prisma'
import { LoginSchema, LoginSchemaType } from '@/schemas/login.schema'
import { compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    const inputs: LoginSchemaType = await request.json()
    if (await LoginSchema.parseAsync(inputs)) {
      const { phone, password } = inputs
      const user = await prisma.user.findFirst({
        where: {
          phone: phone,
        },
        select: {
          id: true,
          active: true,
          subscriber: true,
          profile: true,
          image: true,
          name: true,
          email: true,
          phone: true,
          passHash: true,
        },
      })
      if (!user)
        return new Response(
          JSON.stringify('o número de celular está incorreto'),
          {
            status: 404,
          },
        )

      const comparePass = compareSync(password, user.passHash!)
      if (!comparePass)
        return new Response(JSON.stringify('a senha está incorreta'), {
          status: 403,
        })

      const encryptedToken = jwt.sign(
        {
          id: user?.id!,
          profile: user?.profile!,
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
        },
        env.SECRET,
      )

      return new Response(
        JSON.stringify({
          expiresIn: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
          authorization: encryptedToken,
          data: {
            id: user.id,
            active: user.active,
            subscribe: user.subscriber,
            profile: user.profile,
            image: user.image,
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
        }),
        {
          status: 200,
        },
      )
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
