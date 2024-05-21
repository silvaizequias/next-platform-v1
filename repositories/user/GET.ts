'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { UserType } from '@/types/user'
import { USER_REPOSITORY } from '..'

export const userRepositoryFindMany = async (): Promise<UserType[] | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${USER_REPOSITORY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
    next: { tags: ['users'], revalidate: 3600 },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const userRepositoryFindByDocument = async (
  document: string,
): Promise<UserType | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${USER_REPOSITORY}/document/${document}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
    next: { tags: ['user'], revalidate: 120 },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const userRepositoryFindByEmail = async (
  email: string,
): Promise<UserType | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${USER_REPOSITORY}/email/${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
    next: { tags: ['user'], revalidate: 120 },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const userRepositoryFindById = async (
  id: string,
): Promise<UserType | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${USER_REPOSITORY}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
    next: { tags: ['user'], revalidate: 120 },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}

export const userRepositoryFindByPhone = async (
  phone: string,
): Promise<UserType | any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  return await fetch(`${USER_REPOSITORY}/phone/${phone}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authorization}`,
    },
    next: { tags: ['user'], revalidate: 120 },
  })
    .then(async (data) => await data.json())
    .catch((error: any) => error?.message)
}
