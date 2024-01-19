'use server'

import { CreateOrganizationUserDTOType } from '@/app/api/organization-users/dto'
import { prisma } from '@/libraries/prisma'

export default async function actionCreateOrganizationUser(
  prevState: any,
  formData: FormData,
): Promise<any> {
  try {
    const inputs: CreateOrganizationUserDTOType | any =
      Object.fromEntries(formData)

    return { status: 200, message: '', data: inputs }
  } catch (error: any) {
    await prisma.$disconnect()
    throw new Error(error)
  } finally {
    await prisma.$disconnect()
  }
}
