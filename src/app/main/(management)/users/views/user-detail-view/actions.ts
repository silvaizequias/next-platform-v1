'use server'

import { UpdateUserDTOType } from '@/app/api/users/dto'

export async function actionUpdateUser(
  prevState: any,
  formData: FormData,
): Promise<any> {

  const inputs: UpdateUserDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
