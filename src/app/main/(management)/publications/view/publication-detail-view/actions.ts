'use server'

import { UpdatePublicationDTOType } from '@/app/api/publication-management/publications/dto'
import { prisma } from '@/libraries/prisma'

export async function actionUpdatePublication(
  inputs: UpdatePublicationDTOType,
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
