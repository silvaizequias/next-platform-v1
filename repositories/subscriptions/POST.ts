'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { SUBSCRIPTION_REPOSITORY } from '..'
import {
  CheckoutSubscriptionValidation,
  CheckoutSubscriptionValidationType,
  CreateSubscriptionValidation,
  CreateSubscriptionValidationType,
} from '@/validations/subscription'

export const subscriptionRepositoryCreate = async (
  inputs: CreateSubscriptionValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await CreateSubscriptionValidation.parseAsync(inputs)) {
      return await fetch(`${SUBSCRIPTION_REPOSITORY}`, {
        method: 'POST',
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

export const subscriptionRepositoryCheckout = async (
  inputs: CheckoutSubscriptionValidationType,
) => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await CheckoutSubscriptionValidation.parseAsync(inputs)) {
      return await fetch(`${SUBSCRIPTION_REPOSITORY}/checkout`, {
        method: 'POST',
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
