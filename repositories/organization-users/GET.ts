'use server'

import { env } from '@/environments'
import { nextAuthOptions } from '@/libraries/next-auth'
import { OrganizationUserType } from '@/types/organization-user'
import { getServerSession } from 'next-auth'

export const getOrganizationUsers = async (): Promise<
  OrganizationUserType[] | any
> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/organization-users`, {
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

export const getOrganizationUserById = async (
  id: string,
): Promise<OrganizationUserType | any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(
      `${env.MANAGEMENT_API_URL}/organization-users/${id}`,
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

export const getOrganizationUserByUserId = async (): Promise<
  OrganizationUserType[] | any
> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(
      `${env.MANAGEMENT_API_URL}/organization-users/user/${session?.user?.id}`,
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
