'use server'

import { prisma } from '@/libraries/prisma'
import { UpdateProfileAddressDTOType } from '../../dto'

export async function actionUpdateProfileAddress(
  inputs: UpdateProfileAddressDTOType,
) {
  try {
    return inputs
  } catch (error: any) {
    //await prisma.$disconnect()
    throw new Error(error)
  } finally {
    //await prisma.$disconnect()
  }
}
