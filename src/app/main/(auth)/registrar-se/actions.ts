'use server'

import { SignUpDTOType } from '@/app/api/signup/dto'

export async function actionSignUp(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: SignUpDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
