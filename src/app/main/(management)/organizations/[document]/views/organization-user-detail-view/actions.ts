'use server'

import { prisma } from '@/libraries/prisma'
import { UpdateOrganizationUserDTOType } from '../../../dto'

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
