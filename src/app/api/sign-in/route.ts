import { prisma } from '@/libraries/prisma'
import jwt from 'jsonwebtoken'
import { compareSync } from 'bcrypt'
import { SignInSchema, SignInSchemaType } from '@/types/auth/schema'
import { NextResponse } from 'next/server'

export const POST = async (request: Request): Promise<any> => {
  const NEXT_PUBLIC_JWT_SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY!
  const inputs: SignInSchemaType = await request.json()
  try {
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
          organizations: {
            select: {
              id: true,
              name: true,
              cnpj: true,
            },
          },
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
        return new NextResponse(
          `O número celular ${phone} não existe em nosso sistema!`,
          { status: 404 },
        )

      const userPassword = user?.passHash!

      const passwordValidate = compareSync(password, userPassword)
      if (!passwordValidate)
        return new NextResponse('senha inválida', { status: 403 })

      const encryptedToken = jwt.sign(
        {
          id: user?.id!,
          profile: user?.profile!,
          organizations: user?.organizations!,
          orgs: user?.orgs!,
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
        },
        NEXT_PUBLIC_JWT_SECRET_KEY,
      )

      return new NextResponse(
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
            organizations: user?.organizations!,
            orgs: user?.orgs!,
          },
        }),
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}
