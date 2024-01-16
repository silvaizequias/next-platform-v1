import { CreateUserDTO, CreateUserDTOType } from '@/app/management/users/dto'
import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export async function GET(request: Request) {
  try {
    return new Response(
      JSON.stringify(
        await prisma.user.findFirst({
          where: { softDeleted: false },
          select: {
            id: true,
            active: true,
            subscriber: true,
            suspended: true,
            profile: true,
            name: true,
            image: true,
            phone: true,
            email: true,
            organizations: {
              select: {
                role: true,
                organization: {
                  select: {
                    id: true,
                    name: true,
                    documentCode: true,
                  },
                },
              },
            },
          },
        }),
      ),
      { status: 200 },
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  const randomCode = Math.random().toString(32).substr(2, 14)
  try {
    const inputs: CreateUserDTOType = await request.json()
    if (await CreateUserDTO.parseAsync(inputs)) {
      const { phone, email, password } = inputs

      const userPhone = await prisma.user.findFirst({
        where: { phone: phone },
      })
      if (userPhone)
        return new Response(
          JSON.stringify(
            `o telefone ${phone} já está vinculado a um usuário existente na plataforma`,
          ),
          { status: 409 },
        )

      const userEmail = await prisma.user.findFirst({
        where: { email: email },
      })
      if (userEmail)
        return new Response(
          JSON.stringify(
            `o email ${email} já está vinculado a um usuário existente na plataforma`,
          ),
          { status: 409 },
        )

      const setPassword = password || randomCode

      const data: Prisma.UserCreateInput = {
        ...inputs,
        passHash: hashSync(setPassword, 10),
      }
      await prisma.user.create({ data })

      return new Response(
        JSON.stringify(
          `o usuário foi criado na plataforma e esta é a senha de acesso: ${setPassword}`,
        ),
        { status: 201 },
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
