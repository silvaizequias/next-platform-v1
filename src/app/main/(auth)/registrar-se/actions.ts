'use server'

import { prisma } from '@/libraries/prisma'
import { SignUpDTOType } from './dto'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export async function actionSignUp(inputs: SignUpDTOType): Promise<any> {
  const randomCode = Math.random().toString(32).substr(2, 14)
  try {
    const { email, password, phone } = inputs
    delete inputs?.password

    const setPassword = password || randomCode

    const userPhone = await prisma.user.findFirst({
      where: { phone: phone },
    })

    const userEmail = await prisma.user.findFirst({
      where: { email: email },
    })

    if (userPhone) return `o número ${phone} já existe na plataforma`

    if (userEmail) return `o email ${email} já existe na plataforma`

    const data: Prisma.UserCreateInput = {
      ...inputs,
      passHash: hashSync(setPassword, 10),
    }
    await prisma.user.create({ data })

    return `sua conta foi criada na plataforma e esta é a seua senha de acesso: ${setPassword}`
  } catch (error: any) {
    await prisma.$disconnect()
    throw new Error(error)
  } finally {
    await prisma.$disconnect()
  }
}
