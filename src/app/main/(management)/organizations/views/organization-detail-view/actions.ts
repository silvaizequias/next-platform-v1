'use server'

import { UpdateOrganizationDTOType } from '@/app/api/organizations/dto'

export async function actionUpdateOrganization(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: UpdateOrganizationDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
