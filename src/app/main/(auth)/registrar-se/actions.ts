'use server'

import { env } from '@/environments'
import { SignUpSchema, SignUpSchemaType } from './schema'

export async function actionSignUp(inputs: SignUpSchemaType) {
  try {
    if (await SignUpSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.PLATFORM_API_URL!}/auth/sign-up`, {
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
