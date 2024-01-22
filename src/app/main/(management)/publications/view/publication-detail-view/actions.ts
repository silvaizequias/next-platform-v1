'use server'

import { UpdatePublicationDTOType } from '@/app/api/publication-management/publications/dto'

export async function actionUpdatePublication(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: UpdatePublicationDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
