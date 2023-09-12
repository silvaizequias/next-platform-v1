import { prismaDedicated } from '@/libraries/prisma'
import { UserCreateSchema, UserCreateSchemaType } from '@/schemas/user'

export const GET = async (request: Request) => {
  try {
    await prismaDedicated.$connect()
    return new Response(
      JSON.stringify(
        await prismaDedicated.user.findMany({
          include: {
            accounts: true,
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
    await prismaDedicated.$disconnect()
  }
}

export const POST = async (request: Request) => {
  try {
    await prismaDedicated.$connect()

    return await request.json().then(async (inputs: UserCreateSchemaType) => {
      if (await UserCreateSchema.parseAsync(inputs)) {
        const { name, email, phone } = inputs

        const userPhone = await prismaDedicated.user.findFirst({
          where: { phone: phone },
        })
        if (userPhone)
          return new Response(
            JSON.stringify(
              `O número celular ${phone} já existe em nosso sistema!`,
            ),
            { status: 409 },
          )

        const userEmail = await prismaDedicated.user.findFirst({
          where: { email: email },
        })
        if (userEmail)
          return new Response(
            JSON.stringify(`O e-mail ${email} já existe em nosso sistema!`),
            { status: 409 },
          )

        await prismaDedicated.user.create({ data: inputs })

        return new Response(JSON.stringify(`A conta foi criada!`))
      }
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prismaDedicated.$disconnect()
  }
}
