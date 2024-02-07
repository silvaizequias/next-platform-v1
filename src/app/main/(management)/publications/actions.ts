'use server'

import { env } from '@/environments'
import { PublicationType } from './types'

export async function actionGetPublications(
  authorizationKey: string,
): Promise<PublicationType[] | any> {
  try {
    const data = await fetch(`${env.PUBLICATION_API_URL}/subscriptions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorizationKey: authorizationKey,
      },
    })
    if (!data) return null
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
