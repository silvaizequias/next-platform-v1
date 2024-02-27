'use server'

import { env } from '@/environments'
import { nextAuthOptions } from '@/libraries/next-auth'
import { OrganizationKeyType } from '@/types/organization-key'
import { getServerSession } from 'next-auth'

export const getOrganizationKeys = async (): Promise<
  OrganizationKeyType[] | any
> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/organization-keys`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}

export const getOrganizationKeyById = async (
  id: string,
): Promise<OrganizationKeyType | any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(
      `${env.MANAGEMENT_API_URL}/organization-keys/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      },
    )
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}

export const getOrganizationKeyByKey = async (
  key: string,
): Promise<OrganizationKeyType | any> => {
  try {
    const data = await fetch(
      `${env.MANAGEMENT_API_URL}/organization-keys/key/${key}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}
