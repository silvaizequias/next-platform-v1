'use server'

import { prisma } from '@/libraries/prisma'
import { UpdateUserSchemaType } from '@/schemas/user.schema'
import { hashSync } from 'bcrypt'

export const updateUser = async (
  id: string,
  inputs: UpdateUserSchemaType,
): Promise<any> => {
  try {
    const { password } = inputs
    delete inputs?.password

    const user = await prisma.user.findFirst({ where: { id: id } })
    if (!user)
      return new Response(JSON.stringify('usuário não encontrado'), {
        status: 404,
      })

    if (password)
      await prisma.user.update({
        where: { id: id },
        data: { ...inputs, passHash: hashSync(password, 10) },
      })

    await prisma.user.update({
      where: { id: id },
      data: { ...inputs },
    })
    return new Response(
      JSON.stringify(`as informações do usuário foram atualizadas`),
      { status: 201 },
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
