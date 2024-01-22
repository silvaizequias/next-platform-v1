'use server'

import { CreateDomainDTOType } from '@/app/api/publication-management/domains/dto'

export async function actionCreatePublicationDomain(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: CreateDomainDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
