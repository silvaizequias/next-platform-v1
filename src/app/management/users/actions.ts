'use server'

import { prisma } from '@/libraries/prisma'
import { UserType } from '../users/types'

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
