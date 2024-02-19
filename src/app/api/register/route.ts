import { prisma } from '@/libraries/prisma'
import { RegisterSchema, RegisterSchemaType } from '@/schemas/register.schema'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export async function POST(request: Request) {
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()
  const defaultOrganization = '52378516000178' as string

  try {
    const inputs: RegisterSchemaType = await request.json()
    if (await RegisterSchema.parseAsync(inputs)) {
      const { email, name, organizationDocument, phone, password } = inputs
      delete inputs?.password
      delete inputs?.organizationDocument

      const userPhone = await prisma.user.findFirst({
        where: { phone: phone },
      })
      if (userPhone)
        return new Response(
          JSON.stringify(
            `o email ${phone} já está vinculado a um usuário existente na plataforma`,
          ),
          {
            status: 409,
          },
        )

      const userEmail = await prisma.user.findFirst({
        where: { email: email },
      })
      if (userEmail)
        return new Response(
          JSON.stringify(
            `o email ${email} já está vinculado a um usuário existente na plataforma`,
          ),
          {
            status: 409,
          },
        )

      const setPassword = password || randomCode

      const data: Prisma.OrganizationUsersCreateInput = {
        role: 'client',
        active: true,
        organization: {
          connect: {
            document: organizationDocument || defaultOrganization,
          },
        },
        user: {
          create: {
            ...inputs,
            profile: 'consumer',
            passHash: hashSync(setPassword, 10),
          },
        },
      }
      await prisma.organizationUsers.create({ data })

      return new Response(
        JSON.stringify(`${name}, a sua conta foi criada na plataforma`),
        {
          status: 201,
        },
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
