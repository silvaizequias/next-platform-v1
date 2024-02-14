'use server'

import { env } from '@/environments'
import { OrderItemType } from './types'

export async function actionGetOrderItems(
  authorizationKey: string,
): Promise<OrderItemType[] | any> {
  try {
    const data = await fetch(`${env.ORDER_API_URL}/items`, {
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
