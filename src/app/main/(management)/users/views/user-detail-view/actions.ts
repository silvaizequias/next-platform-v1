'use server'

import { UpdateUserDTOType } from '@/app/main/(management)/users/dto'
import { prisma } from '@/libraries/prisma'

export async function actionUpdateUser(
  inputs: UpdateUserDTOType,
): Promise<any> {
  try {
    return inputs
  } catch (error: any) {
    //await prisma.$disconnect()
    throw new Error(error)
  } finally {
    //await prisma.$disconnect()
  }
}
