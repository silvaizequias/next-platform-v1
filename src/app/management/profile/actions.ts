'use server'

import { prisma } from '@/libraries/prisma'
import { UserType } from '../users/types'

export async function actionGetProfileByPhone(
  phone: string,
): Promise<UserType | any> {
  try {
    const profile = await prisma.user.findFirst({
      where: { phone: phone, softDeleted: false, suspended: false },
    })
    if (!profile) return null

    return profile
  } catch (error: any) {
    await prisma.$disconnect()
    throw new Error(error)
  } finally {
    await prisma.$disconnect()
  }
}
