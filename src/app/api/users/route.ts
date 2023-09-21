import { prisma } from '@/libraries/prisma'
import { UserCreateSchema, UserCreateSchemaType } from '@/types/user/schema'
import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'

export async function GET(request: Request) {
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
            contracts: true,
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
    console.error(error)
    return new Error(error?.message || error)
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
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
          return new Response(
            JSON.stringify(`esta conta já existe em nosso sistema!`),
            { status: 409 },
          )

        const data: Prisma.UserCreateInput = {
          ...inputs,
          passHash: await hash(password || randomCode!, 10),
        }
        await prisma.user.create({ data })

        return new Response(
          JSON.stringify(
            `A conta foi criada e a senha enviada para o email ${email}!`,
          ),
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
