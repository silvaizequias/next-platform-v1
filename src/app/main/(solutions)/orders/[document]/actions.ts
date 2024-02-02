'use server'

import { revalidatePath } from 'next/cache'
import { CreateOrderDTO, CreateOrderDTOType } from './dto'

const ORDER_URL = process.env.ORDER_URL!

export async function actionGetOrdersByOrganization(
  document: string,
  authorizationKey: string,
) {
  try {
    const data = await fetch(`${ORDER_URL}/orders/organization/${document}`, {
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

export async function actionCreateOrder(
  authorizationKey: string,
  inputs: CreateOrderDTOType,
) {
  try {
    if (await CreateOrderDTO.parseAsync(inputs)) {
      const data = await fetch(`${ORDER_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          authorizationKey: authorizationKey,
        },
      })
      revalidatePath('/orders')
      return data && (await data.json())
    }
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
