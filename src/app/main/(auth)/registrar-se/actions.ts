'use server'

import { SignUpDTOType } from '@/app/api/signup/dto'

export async function actionSignUp(inputs: SignUpDTOType): Promise<any> {
  try {
    return inputs
  } catch (error: any) {
    throw new Error(error)
  }
}
