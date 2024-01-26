'use server'

import { SignUpDTOType } from './dto'

const PLATFORM_MANAGEMENT_URL = process.env.PLATFORM_MANAGEMENT_URL!

export async function actionSignUp(inputs: SignUpDTOType): Promise<any> {
  try {
    const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/auth/sign-up`, {
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
