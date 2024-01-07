import { prisma } from '@/libraries/prisma'
import { SignUpDTO, SignUpDTOType } from './dto'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export async function POST(request: Request) {
  const randomCode = Math.random().toString(32).substr(2, 14)
  try {
    const inputs: SignUpDTOType = await request.json()
    if (await SignUpDTO.parseAsync(inputs)) {
      const { email, password, phone } = inputs
      delete inputs?.password

      const setPassword = password || randomCode

      const userPhone = await prisma.user.findFirst({
        where: { phone: phone },
      })

      const userEmail = await prisma.user.findFirst({
        where: { email: email },
      })

      if (userPhone)
        return new Response(
          JSON.stringify(`o número ${phone} já existe na plataforma`),
          { status: 409 },
        )

      if (userEmail)
        return new Response(
          JSON.stringify(`o email ${email} já existe na plataforma`),
          { status: 409 },
        )

      const data: Prisma.UserCreateInput = {
        ...inputs,
        passHash: hashSync(setPassword, 10),
      }
      await prisma.user.create({ data })

      return new Response(
        JSON.stringify(
          `sua conta foi criada na plataforma e esta é a seua senha de acesso: ${setPassword}`,
        ),
        { status: 201 },
      )
    }
  } catch (error: any) {
    await prisma.$disconnect()
    console.log(error)
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
