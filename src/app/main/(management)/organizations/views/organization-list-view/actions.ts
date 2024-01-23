'use server'

import { prisma } from '@/libraries/prisma'
import { CreateOrganizationDTOType } from '../../dto'

export async function actionCreateOrganization(
  inputs: CreateOrganizationDTOType,
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
