import { AuthSignInDTO, AuthSignInDTOType } from '@/dto/auth.dto'
import { prisma } from '@/libraries/prisma'
import { compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!
  try {
    const inputs: AuthSignInDTOType = await request.json()
    if (await AuthSignInDTO.parseAsync(inputs)) {
      const { email, password } = inputs
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
        include: {
          organizations: {
            select: {
              organizationId: true,
              organization: { select: { name: true, documentCode: true } },
              role: true,
            },
          },
        },
      })
      if (!user)
        return new Response(
          JSON.stringify('as informações estão incorretas ou não existem'),
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
          data: {
            id: user.id,
            profile: user.profile,
            image: user.image,
            name: user.name,
            email: user.email,
            phone: user.phone,
            organizations: user.organizations,
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
