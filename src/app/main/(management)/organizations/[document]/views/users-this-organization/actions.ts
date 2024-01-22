'use server'

import { CreateOrganizationUserDTOType } from '@/app/api/organization-users/dto'
import { prisma } from '@/libraries/prisma'

export default async function actionCreateOrganizationUser(
  inputs: CreateOrganizationUserDTOType,
): Promise<any> {
  try {
    return inputs
  } catch (error: any) {
    await prisma.$disconnect()
    throw new Error(error)
  } finally {
    await prisma.$disconnect()
  }
}
