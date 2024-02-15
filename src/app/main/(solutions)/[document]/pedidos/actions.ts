'use server'

import {
  CreateOrderSchemaType,
  UpdateOrderSchemaType,
} from '@/app/main/(management)/orders/schema'
import { OrderType } from '@/app/main/(management)/orders/types'
import { env } from '@/environments'
import { revalidatePath } from 'next/cache'

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

export async function actionCreaeteMyOrganziationOrder(
  authorizationKey: string,
  inputs: CreateOrderSchemaType,
): Promise<OrderType | any> {
  try {
    const data = await fetch(`${env.ORDER_API_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: {
        'Content-Type': 'application/json',
        authorizationKey: authorizationKey,
      },
    })
    if (!data) return null
    revalidatePath(`/${inputs?.organization}/pedidos`)
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}

export async function actionUpdateMyOrganziationOrder(
  authorizationKey: string,
  inputs: UpdateOrderSchemaType,
  id: string,
): Promise<OrderType | any> {
  try {
    const data = await fetch(`${env.ORDER_API_URL}/orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(inputs),
      headers: {
        'Content-Type': 'application/json',
        authorizationKey: authorizationKey,
      },
    })
    if (!data) return null
    revalidatePath(`/${inputs?.organization}/pedidos`)
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
