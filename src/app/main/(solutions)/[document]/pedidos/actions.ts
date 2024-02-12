'use server'

import { OrderType } from '@/app/main/(management)/orders/types'
import { env } from '@/environments'

export async function actionGetMyOrganziationOrders(
  authorizationKey: string,
  organizationDocument: string,
): Promise<OrderType[] | any> {
  try {
    const data = await fetch(
      `${env.ORDER_API_URL}/orders/organization/${organizationDocument}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorizationKey: authorizationKey,
        },
        //next: { revalidate: 3600 },
      },
    )
    if (!data) return null
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
