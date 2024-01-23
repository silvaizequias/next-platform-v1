'use server'

import { prisma } from '@/libraries/prisma'
import { UpdateOrganizationDTOType } from '../../dto'

export async function actionUpdateOrganization(
  inputs: UpdateOrganizationDTOType,
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
