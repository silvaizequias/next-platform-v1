import { prisma } from '@/libraries/prisma'
import jwt from 'jsonwebtoken'
import { compareSync } from 'bcrypt'
import { SignInSchema, SignInSchemaType } from '@/types/auth/schema'

export default async function POST(request: Request) {
  const NEXT_PUBLIC_JWT_SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY!
  try {
    await prisma.$connect()

    return await request.json().then(async (inputs: SignInSchemaType) => {
      if (await SignInSchema.parseAsync(inputs)) {
        const { phone, password } = inputs

        const user = await prisma.user.findFirst({
          where: { phone: phone },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
            profile: true,
            passHash: true,
            isActive: true,
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
        })
        if (!user)
          return new Response(
            JSON.stringify(
              `O número celular ${phone} não existe em nosso sistema!`,
            ),
            { status: 404 },
          )

        const passwordValidate = compareSync(password, user?.passHash!)
        if (!passwordValidate)
          new Response(JSON.stringify('senha inválida'), { status: 403 })

        const encryptedToken = jwt.sign(
          {
            phone,
            profile: user?.profile!,
            orgs: user?.orgs!,
            iat: Math.floor(Date.now() / 1000) - 30,
            exp: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
          },
          NEXT_PUBLIC_JWT_SECRET_KEY,
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
              image: user.image!,
              profile: user?.profile!,
              isActive: user?.isActive!,
              orgs: user?.orgs!,
            },
          }),
        )
      }
    })
  } catch (error: any) {
    await prisma.$disconnect()
    console.error(error)
    return new Error(error?.message || error)
  } finally {
    await prisma.$disconnect()
  }
}
