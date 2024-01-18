'use server'

import { SignInDTOType } from '@/app/api/signin/dto'

export async function actionSignIn(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: SignInDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}
