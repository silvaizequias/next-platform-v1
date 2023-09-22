import { prisma } from '@/libraries/prisma'
import { UserCreateSchema, UserCreateSchemaType } from '@/types/user/schema'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.user.findMany({
          where: { softDeleted: false },
          include: {
            accounts: {
              select: {
                id: true,
                type: true,
                provider: true,
              },
            },
            subscriptions: true,
            organizations: true,
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
            sessions: {
              select: {
                sessionToken: true,
                expires: true,
              },
            },
          },
        }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message! || error!, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export const POST = async (
  request: Request,
): Promise<UserCreateSchemaType | any> => {
  const randomCode = Math.random().toString(32).substr(2, 12)

  try {
    await prisma.$connect()

    return await request.json().then(async (inputs: UserCreateSchemaType) => {
      if (await UserCreateSchema.parseAsync(inputs)) {
        const { name, phone, email, password } = inputs
        delete inputs?.password

        const user = await prisma.user.findFirst({
          where: {
            email: email,
            phone: phone,
          },
        })
        if (user)
          return new Response(`esta conta já existe em nosso sistema!`, {
            status: 409,
          })

        const data: Prisma.UserCreateInput = {
          ...inputs,
          passHash: await hash(password || randomCode!, 10),
        }
        await prisma.user.create({ data })

        return new Response(
          `A conta foi criada e a senha enviada para o email ${email}!`,
        )
      }
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message! || error!, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
