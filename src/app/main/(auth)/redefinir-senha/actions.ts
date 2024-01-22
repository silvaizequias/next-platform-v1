'use server'

import { ResetPasswordDTOType } from '@/app/api/reset-password/dto'

export async function actionResetPassword(
  inputs: ResetPasswordDTOType,
): Promise<any> {
  try {
    const NEXTAUTH_URL = process.env.NEXTAUTH_URL
    const response = await fetch(`${NEXTAUTH_URL}/api/reset-password`, {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    return { status: response.status, message: response && response.json() }
  } catch (error: any) {
    throw new Error(error)
  }
}
