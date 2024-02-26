'use server'

import { env } from '@/environments'
import { nextAuthOptions } from '@/libraries/next-auth'
import {
  CreateSubscriptionSchema,
  CreateSubscriptionSchemaType,
} from '@/schemas/subscription'
import { getServerSession } from 'next-auth'

export const createSubscription = async (
  inputs: CreateSubscriptionSchemaType,
): Promise<any> => {
  try {
    if (await CreateSubscriptionSchema.parseAsync(inputs)) {
      const session = await getServerSession(nextAuthOptions)
      const data = await fetch(`${env.MANAGEMENT_API_URL}/subscriptions`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      })
      return data && (await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
