'use server'

import { prisma } from '@/libraries/prisma'
import { CreateOrganizationUserDTOType } from '../../../dto'

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
