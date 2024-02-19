'use server'

import { prisma } from '@/libraries/prisma'
import { CreateUserSchema, CreateUserSchemaType } from '@/schemas/user.schema'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export const postUser = async (inputs: CreateUserSchemaType): Promise<any> => {
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()
  try {
    if (await CreateUserSchema.parseAsync(inputs)) {
      const { name, email, phone, password } = inputs
      delete inputs?.password

      const userPhone = await prisma.user.findFirst({
        where: { phone: phone },
      })
      if (userPhone)
        return new Response(
          JSON.stringify(
            `o email ${phone} já está vinculado a um usuário existente na plataforma`,
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
      return `o usuario ${name} foi criado`
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}
