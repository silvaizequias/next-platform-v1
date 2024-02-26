'use server'

import { env } from '@/environments'
import { CreateItemSchema, CreateItemSchemaType } from '@/schemas/item'

export const createItem = async (
  inputs: CreateItemSchemaType,
  authorizationKey: string,
): Promise<any> => {
  const randomCode = Math.random().toString(32).substr(2, 16)
  try {
    if (await CreateItemSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.ORDERS_API_URL}/items`, {
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
