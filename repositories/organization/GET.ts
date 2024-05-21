'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { OrganizationType } from '@/types/organization'
import { getServerSession } from 'next-auth'
import { ORGANIZATION_REPOSITORY } from '..'

export const organizationRepositoryFindMany = async (): Promise<
  OrganizationType[] | any
> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${ORGANIZATION_REPOSITORY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
    next: { tags: ['organizations'], revalidate: 3600 },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const organizationRepositoryFindByDocument = async (
  document: string,
): Promise<OrganizationType | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${ORGANIZATION_REPOSITORY}/document/${document}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
    next: {
      tags: ['organization'],
      revalidate: 120,
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const organizationRepositoryFindById = async (
  id: string,
): Promise<OrganizationType | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${ORGANIZATION_REPOSITORY}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
    next: {
      tags: ['organization'],
      revalidate: 120,
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const organizationRepositoryVerifyByDocument = async (
  document: string,
): Promise<OrganizationType | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${ORGANIZATION_REPOSITORY}/verify/${document}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
    next: {
      tags: ['organization'],
      revalidate: 120,
    },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}
