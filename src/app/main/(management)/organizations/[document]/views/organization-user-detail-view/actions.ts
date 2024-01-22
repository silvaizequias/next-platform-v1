'use server'

import { UpdateOrganizationUserDTOType } from '@/app/api/organization-users/dto'
import { prisma } from '@/libraries/prisma'

export default async function actionUpdateOrganizationUser(
  inputs: UpdateOrganizationUserDTOType,
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
