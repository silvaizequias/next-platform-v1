'use server'

import { CreatePublicationDTOType } from '@/app/api/publication-management/publications/dto'
import { prisma } from '@/libraries/prisma'

export async function actionCreatePublication(
  inputs: CreatePublicationDTOType,
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
