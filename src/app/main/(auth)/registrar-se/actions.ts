'use server'

import { SignUpDTOType } from './dto'

export async function actionSignUp(inputs: SignUpDTOType): Promise<any> {
  try {
    return inputs
  } catch (error: any) {
    throw new Error(error)
  }
}
