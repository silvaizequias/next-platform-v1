'use server'

import { env } from '@/environments'
import { OrganizationUserType } from '@/types/organization-user'

export const getOrganizationUsers = async (): Promise<
  OrganizationUserType[] | any
> => {
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/organization-users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
  try {
    const data = await fetch(
      `${env.MANAGEMENT_API_URL}/organization-users/${id}`,
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

export const getOrganizationUserByUserId = async (
  id: string,
): Promise<OrganizationUserType[] | any> => {
  try {
    const data = await fetch(
      `${env.MANAGEMENT_API_URL}/organization-users/user/${id}`,
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
