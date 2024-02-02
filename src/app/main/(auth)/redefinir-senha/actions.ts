'use server'

import { env } from '@/environments'
import { ResetPasswordSchema, ResetPasswordSchemaType } from './schema'

export async function actionResetPassword(inputs: ResetPasswordSchemaType) {
  try {
    if (await ResetPasswordSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.PLATFORM_API_URL}/auth/password-reset`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return await data.json()
    }
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
