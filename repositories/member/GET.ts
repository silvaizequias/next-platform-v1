'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { MEMBER_REPOSITORY } from '..'
import { MemberType } from '@/types/organization'

export const memberRepositoryFindMany = async (): Promise<
  MemberType[] | any
> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${MEMBER_REPOSITORY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
    next: {
      tags: ['members'],
      revalidate: 3600,
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const memberRepositoryFindByPhone = async (
  phone: string,
): Promise<MemberType[] | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${MEMBER_REPOSITORY}/phone/${phone}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
    next: {
      tags: ['member'],
      revalidate: 120,
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const memberRepositoryFindById = async (
  id: string,
): Promise<MemberType | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${MEMBER_REPOSITORY}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
    next: {
      tags: ['member'],
      revalidate: 120,
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}
