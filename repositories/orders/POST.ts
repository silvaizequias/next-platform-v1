'use server'

import { env } from '@/environments'
import { CreateOrderSchemaType, CreateOrderSchema } from '@/schemas/order'

export const createOrder = async (
  inputs: CreateOrderSchemaType,
  authorizationKey: string,
): Promise<any> => {
  const randomCode = Math.random().toString(32).substr(2, 16)
  try {
    if (await CreateOrderSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.ORDERS_API_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          authorizationKey: authorizationKey,
        },
      })
      return data && (await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
