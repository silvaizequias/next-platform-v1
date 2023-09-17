import { prisma } from '@/libraries/prisma'
import { UserCreateSchema, UserCreateSchemaType } from '@/schemas/user'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()
    return new Response(
      JSON.stringify(
        await prisma.user.findMany({
          include: {
            accounts: true,
            services: true,
            sessions: true,
            subscriptions: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const POST = async (request: Request) => {
  try {
    await prisma.$connect()

    return await request.json().then(async (inputs: UserCreateSchemaType) => {
      if (await UserCreateSchema.parseAsync(inputs)) {
        const { name, email, phone } = inputs

        const userPhone = await prisma.user.findFirst({
          where: { phone: phone },
        })
        if (userPhone)
          return new Response(
            JSON.stringify(
              `O número celular ${phone} já existe em nosso sistema!`,
            ),
            { status: 409 },
          )

        const userEmail = await prisma.user.findFirst({
          where: { email: email },
        })
        if (userEmail)
          return new Response(
            JSON.stringify(`O e-mail ${email} já existe em nosso sistema!`),
            { status: 409 },
          )

        await prisma.user.create({ data: inputs })

        return new Response(JSON.stringify(`A conta foi criada!`))
      }
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
