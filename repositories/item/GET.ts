'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { ITEM_REPOSITORY } from '..'
import { ItemType } from '@/types/order'

export const itemRepositoryFindMany = async (): Promise<ItemType[] | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${ITEM_REPOSITORY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    next: {
      tags: ['items'],
      revalidate: 3600,
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const itemRepositoryFindById = async (
  id: string,
): Promise<ItemType | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${ITEM_REPOSITORY}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    next: {
      tags: ['item'],
      revalidate: 3600,
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}
