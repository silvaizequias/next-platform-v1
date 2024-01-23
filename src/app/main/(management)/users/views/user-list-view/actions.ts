'use server'

import { CreateUserDTOType } from '@/app/main/(management)/users/dto'
import { prisma } from '@/libraries/prisma'

export async function actionCreateUser(
  inputs: CreateUserDTOType,
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
