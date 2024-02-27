'use server'

import { env } from '@/environments'
import { nextAuthOptions } from '@/libraries/next-auth'
import {
  UpdateSubscriptionSchema,
  UpdateSubscriptionSchemaType,
} from '@/schemas/subscription'
import { getServerSession } from 'next-auth'

export const updateSubscription = async (
  id: string,
  inputs: UpdateSubscriptionSchemaType,
): Promise<any> => {
  try {
    if (await UpdateSubscriptionSchema.parseAsync(inputs)) {
      const session = await getServerSession(nextAuthOptions)
      const data = await fetch(
        `${env.MANAGEMENT_API_URL}/subscriptions/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(inputs),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.authorization}`,
          },
        },
      )
      return data && (await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
