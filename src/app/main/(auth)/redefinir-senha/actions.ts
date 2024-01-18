'use server'

import { ResetPasswordDTOType } from "@/app/api/reset-password/dto"

export async function actionResetPassword(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: ResetPasswordDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}