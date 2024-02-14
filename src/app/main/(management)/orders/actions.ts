'use server'

import { env } from '@/environments'
import { OrderType } from './types'

export async function actionGetOrders(
  authorizationKey: string,
): Promise<OrderType[] | any> {
  try {
    const data = await fetch(
      `${env.ORDER_API_URL}/orders`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorizationKey: authorizationKey,
        },
      },
    )
    if (!data) return null
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
