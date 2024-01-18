'use server'

import { CreateOrganizationDTOType } from '@/app/api/organizations/dto'

export async function actionCreateOrganization(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: CreateOrganizationDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
