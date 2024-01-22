'use server'

import { prisma } from '@/libraries/prisma'
import { UpdateDomainDTOType } from '@/app/api/publication-management/domains/dto'

export async function actionUpdatePublicationDomain(
  inputs: UpdateDomainDTOType,
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
