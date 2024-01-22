'use server'

import { CreateUserDTOType } from "@/app/api/users/dto"

export async function actionCreateUser(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const inputs: CreateUserDTOType | any = Object.fromEntries(formData)

  return { status: 200, message: '', data: inputs }
}