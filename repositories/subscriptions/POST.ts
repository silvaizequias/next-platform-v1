'use server'

import { env } from '@/environments'
import {
  CreateSubscriptionSchema,
  CreateSubscriptionSchemaType,
} from '@/schemas/subscription'

export const createSubscription = async (
  inputs: CreateSubscriptionSchemaType,
): Promise<any> => {
  try {
    if (await CreateSubscriptionSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.MANAGEMENT_API_URL}/subscriptions`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data && (await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
