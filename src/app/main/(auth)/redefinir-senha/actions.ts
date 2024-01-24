'use server'

import { prisma } from '@/libraries/prisma'
import { ResetPasswordCodeDTOType, ResetPasswordDTOType } from './dto'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export async function actionResetPassword(
  inputs: ResetPasswordDTOType,
): Promise<any> {
  const randomCode = Math.random().toString(32).substr(2, 6).toUpperCase()
  try {
    const { phone } = inputs

    const user = await prisma.user.findFirst({
      where: { phone: phone },
    })

    if (!user)
      return `o número ${phone} não possui registro ativo na plataforma`

    const data: Prisma.UserUpdateInput = {
      active: false,
      accessCode: randomCode,
    }
    await prisma.user.update({ where: { id: user?.id }, data })

    return `utilize o código ${randomCode} para redefinir a senha`
  } catch (error: any) {
    await prisma.$disconnect()
    throw new Error(error)
  } finally {
    await prisma.$disconnect()
  }
}

export async function actionWithPasswordCode(
  inputs: ResetPasswordCodeDTOType,
): Promise<any> {
  const randomCode = Math.random().toString(32).substr(2, 14)
  try {
    const { accessCode } = inputs

    const user = await prisma.user.findFirst({
      where: { accessCode: accessCode, softDeleted: false, active: false },
    })
    if (!user) return `o código informado não é válido`

    const data: Prisma.UserUpdateInput = {
      active: true,
      passHash: hashSync(randomCode, 10),
    }
    await prisma.user.update({ where: { id: user?.id }, data })

    return `a senha foi redefinida: ${randomCode}`
  } catch (error: any) {
    await prisma.$disconnect()
    throw new Error(error)
  } finally {
    await prisma.$disconnect()
  }
}
