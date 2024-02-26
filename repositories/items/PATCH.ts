'use server'

import { env } from '@/environments'
import { UpdateItemSchema, UpdateItemSchemaType } from '@/schemas/item'

export const updateItem = async (
  id: string,
  inputs: UpdateItemSchemaType,
  authorizationKey: string,
): Promise<any> => {
  try {
    if (await UpdateItemSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.ORDERS_API_URL}/items/${id}`, {
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
