'use server'

import { prisma } from '@/libraries/prisma'
import { UserType } from '../users/types'
import { CreateUserDTOType, UpdateUserDTOType } from './dto'

export async function actionGetUserById(id: string): Promise<UserType | any> {
  try {
    const user = await prisma.user.findFirst({
      where: { id: id, softDeleted: false, suspended: false },
    })
    if (!user) return null

    return user
  } catch (error: any) {
    await prisma.$disconnect()
    throw new Error(error)
  } finally {
    await prisma.$disconnect()
  }
}

export async function actionGetUsers(): Promise<UserType | any> {
  try {
    const users = await prisma.user.findMany({
      where: { softDeleted: false },
    })
    if (!users) return null

    return users
  } catch (error: any) {
    await prisma.$disconnect()
    throw new Error(error)
  } finally {
    await prisma.$disconnect()
  }
}

export async function actionSetCreateUser(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: CreateUserDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}

export async function actionSetUpdateUser(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: UpdateUserDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
