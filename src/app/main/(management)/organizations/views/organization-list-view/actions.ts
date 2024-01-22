'use server'

import { CreateOrganizationDTOType } from '@/app/api/organizations/dto'
import { prisma } from '@/libraries/prisma'

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
