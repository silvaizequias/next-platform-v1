'use server'

import { Session } from 'next-auth'
import { SubscriptionType } from './types'
import { env } from '@/environments'

export async function actionGetSubscriptions(
  session: Session,
): Promise<SubscriptionType[] | any> {
  try {
    const data = await fetch(`${env.PLATFORM_API_URL!}/subscriptions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })
    if (!data) return null
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
