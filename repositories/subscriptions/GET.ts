'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { SUBSCRIPTION_REPOSITORY } from '..'
import { SubscriptionType } from '@/types/organization'

export const subscriptionRepositoryFindMany = async (): Promise<
  SubscriptionType[] | any
> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${SUBSCRIPTION_REPOSITORY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const subscriptionRepositoryFindById = async (
  id: string,
): Promise<SubscriptionType | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${SUBSCRIPTION_REPOSITORY}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const subscriptionRepositoryFindByOrganization = async (
  document: string,
): Promise<SubscriptionType | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${SUBSCRIPTION_REPOSITORY}/organization/${document}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}
