'use server'

import { prisma } from '@/libraries/prisma'
import { UserType } from '../users/types'
import { UpdateProfileDTOType, UpdateProfilePasswordDTOType } from './dto'

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

export async function actionSetUpdateProfile(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: UpdateProfileDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}

export async function actionSetUpdateProfilePassword(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: UpdateProfilePasswordDTOType | any =
    Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
