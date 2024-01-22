'use server'

import { prisma } from '@/libraries/prisma'
import { UpdateProfilePasswordDTOType } from '../../dto'

export async function actionUpdateProfilePassword(
  inputs: UpdateProfilePasswordDTOType,
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
