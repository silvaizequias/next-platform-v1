import { AuthSignUpSchema, AuthSignUpSchemaType } from '@/schemas/auth'
import { prismaDedicated } from '@/libraries/prisma'

export const POST = async (request: Request) => {
  try {
    await prismaDedicated.$connect()
    return await request.json().then(async (inputs: AuthSignUpSchemaType) => {
      if (await AuthSignUpSchema.parseAsync(inputs)) {
        const { name, phone, email } = inputs
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
