'use server'

import { UpdateOrganizationDTOType } from '@/app/api/organizations/dto'
import { prisma } from '@/libraries/prisma'

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
