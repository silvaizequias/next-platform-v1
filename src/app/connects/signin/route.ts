import { prisma } from '@/libraries/prisma'
import { compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SignInDTO, SignInDTOType } from './dto'

export async function POST(request: Request) {
  const SECRET = process.env.SECRET!

  try {
    const inputs: SignInDTOType = await request.json()
    if (await SignInDTO.parseAsync(inputs)) {
      const { phone, password } = inputs

      const user = await prisma.user.findFirst({
        where: { phone: phone, softDeleted: false },
      })
      if (!user)
        return new Response(
          JSON.stringify(
            `o número ${phone} não possui registro ativo na plataforma`,
          ),
          { status: 404 },
        )

      const comparePass = compareSync(password, user.passHash!)
      if (!comparePass)
        return new Response(JSON.stringify('a senha está incorreta'), {
          status: 403,
        })

      if (user && user.suspended)
        return new Response(JSON.stringify('esse acesso está suspenso'), {
          status: 401,
        })

      const encryptedToken = jwt.sign(
        {
          id: user?.id!,
          profile: user?.profile!,
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
        },
        SECRET,
      )

      return new Response(
        JSON.stringify({
          expiresIn: Math.floor(Date.now() / 1000) + 14 * 24 * 60 * 60,
          Authorization: encryptedToken,
          data: {
            id: user.id,
            active: user.active,
            subscriber: user.subscriber,
            profile: user.profile,
            image: user.image,
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
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
