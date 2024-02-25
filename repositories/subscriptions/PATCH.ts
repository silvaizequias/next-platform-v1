'use server'

import { env } from '@/environments'
import {
  UpdateSubscriptionSchema,
  UpdateSubscriptionSchemaType,
} from '@/schemas/subscription'

export const updateSubscription = async (
  id: string,
  inputs: UpdateSubscriptionSchemaType,
): Promise<any> => {
  try {
    if (await UpdateSubscriptionSchema.parseAsync(inputs)) {
      const data = await fetch(
        `${env.MANAGEMENT_API_URL}/subscriptions/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(inputs),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      return data && (await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
