'use server'

import { ResetPasswordCodeDTOType, ResetPasswordDTOType } from './dto'

const PLATFORM_MANAGEMENT_URL = process.env.PLATFORM_MANAGEMENT_URL!

export async function actionResetPassword(
  inputs: ResetPasswordDTOType,
): Promise<any> {
  const randomCode = Math.random().toString(32).substr(2, 6)
  try {
    const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/auth/password-reset`, {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return await data.json()
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function actionWithPasswordCode(
  inputs: ResetPasswordCodeDTOType,
): Promise<any> {
  const randomCode = Math.random().toString(32).substr(2, 14)
  try {
    return inputs
  } catch (error: any) {
    throw new Error(error)
  }
}
