'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import {
  UpdateSubscriptionValidation,
  UpdateSubscriptionValidationType,
} from '@/validations/subscription'
import { getServerSession } from 'next-auth'
import { SUBSCRIPTION_REPOSITORY } from '..'

export const subscriptionRepositoryUpdate = async (
  id: string,
  inputs: UpdateSubscriptionValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization

  try {
    if (await UpdateSubscriptionValidation.parseAsync(inputs)) {
      return await fetch(`${SUBSCRIPTION_REPOSITORY}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authorization}`,
        },
      }).then(async (data) => await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
