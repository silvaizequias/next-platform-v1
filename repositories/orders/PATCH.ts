'use server'

import { env } from '@/environments'
import { UpdateOrderSchemaType, UpdateOrderSchema } from '@/schemas/order'

export const updateOrder = async (
  id: string,
  inputs: UpdateOrderSchemaType,
  authorizationKey: string,
) => {
  try {
    if (await UpdateOrderSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.ORDERS_API_URL}/orders/${id}`, {
        method: 'PATCH',
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
