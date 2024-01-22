'use server'

import { prisma } from '@/libraries/prisma'
import { UpdateProfileInformationDTOType } from '../../dto'

export async function actionUpdateProfileInformation(
  inputs: UpdateProfileInformationDTOType,
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
