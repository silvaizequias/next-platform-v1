'use server'

import { CreatePublicationDTOType } from '@/app/api/publication-management/publications/dto'

export async function actionCreatePublication(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: CreatePublicationDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
