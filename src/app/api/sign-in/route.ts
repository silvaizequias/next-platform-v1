import { prisma } from '@/libraries/prisma'
import { AuthSignInSchema, AuthSignInSchemaType } from '@/types/auth/schema'
import { compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!
  try {
    const inputs: AuthSignInSchemaType = await request.json()
    if (await AuthSignInSchema.parseAsync(inputs)) {
      const { email, password } = inputs
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
        select: {
          id: true,
          profile: true,
          image: true,
          name: true,
          email: true,
          phone: true,
          passHash: true,
          organizations: {
            select: {
              role: true,
              organization: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  documentCode: true,
                },
              },
            },
          },
        },
      })
      if (!user)
        return new Response('as informações estão incorretas ou não existem', {
          status: 404,
        })

      const comparePass = compareSync(password, user.passHash!)
      if (!comparePass)
        return new Response('a senha está incorreta', { status: 403 })

      const encryptedToken = jwt.sign(
        {
          id: user?.id!,
          profile: user?.profile!,
          organizations: user?.organizations,
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
        },
        JWT_SECRET_KEY,
      )

      return new Response(
        JSON.stringify({
          expiresIn: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
          Authorization: encryptedToken,
          data: user,
        }),
        {
          status: 201,
        },
      )
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
