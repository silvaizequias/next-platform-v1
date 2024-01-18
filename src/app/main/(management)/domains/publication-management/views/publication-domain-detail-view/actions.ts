'use server'

import { UpdateDomainDTOType } from '@/app/api/publication-management/domains/dto'

export async function actionUpdatePublicationDomain(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: UpdateDomainDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
