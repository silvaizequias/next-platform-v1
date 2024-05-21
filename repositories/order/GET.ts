'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { ORDER_REPOSITORY } from '..'
import { OrderType } from '@/types/order'

export const orderRepositoryFindMany = async (
  authorizationKey: string,
): Promise<OrderType[] | any> => {
  const session = await getServerSession(nextAuthOptions)

  if (session)
    return await fetch(`${ORDER_REPOSITORY}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationKey,
      },
      next: {
        tags: ['orders'],
        revalidate: 3600,
      },
    })
      .then(async (data) => await data.json())
      .catch((error: any) => error?.message)

  return null
}

export const orderRepositoryFindByCode = async (
  code: string,
  authorizationKey: string,
): Promise<OrderType | any> => {
  const session = await getServerSession(nextAuthOptions)

  if (session)
    return await fetch(`${ORDER_REPOSITORY}/code/${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationKey,
      },
      next: {
        tags: ['order'],
        revalidate: 120,
      },
    })
      .then(async (data) => await data.json())
      .catch((error: any) => error?.message)

  return null
}

export const orderRepositoryFindByCustomer = async (
  customer: string,
): Promise<OrderType[] | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  if (session)
    return await fetch(`${ORDER_REPOSITORY}/customer/${customer}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      next: {
        tags: ['order'],
        revalidate: 120,
      },
    })
      .then(async (data) => await data.json())
      .catch((error: any) => error?.message)

  return null
}

export const orderRepositoryFindByMember = async (
  member: string,
): Promise<OrderType[] | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  if (session)
    return await fetch(`${ORDER_REPOSITORY}/member/${member}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      next: {
        tags: ['order'],
        revalidate: 120,
      },
    })
      .then(async (data) => await data.json())
      .catch((error: any) => error?.message)

  return null
}

export const orderRepositoryFindByOrganization = async (
  organization: string,
  authorizationKey: string,
): Promise<OrderType[] | any> => {
  const session = await getServerSession(nextAuthOptions)

  if (session)
    return await fetch(`${ORDER_REPOSITORY}/organization/${organization}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationKey,
      },
      next: {
        tags: ['order'],
        revalidate: 120,
      },
    })
      .then(async (data) => await data.json())
      .catch((error: any) => error?.message)

  return null
}

export const orderRepositoryFindById = async (
  id: string,
  authorizationKey: string,
): Promise<OrderType | any> => {
  const session = await getServerSession(nextAuthOptions)

  if (session)
    return await fetch(`${ORDER_REPOSITORY}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationKey,
      },
      next: {
        tags: ['order'],
        revalidate: 120,
      },
    })
      .then(async (data) => await data.json())
      .catch((error: any) => error?.message)

  return null
}
