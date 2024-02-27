'use server'

import { env } from '@/environments'
import { nextAuthOptions } from '@/libraries/next-auth'
import { OrganizationType } from '@/types/organization'
import { getServerSession } from 'next-auth'

export const getOrganizations = async (): Promise<OrganizationType[] | any> => {
  try {
    const session = await getServerSession(nextAuthOptions)
    const data = await fetch(`${env.MANAGEMENT_API_URL}/organizations`, {
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

export const getOrganizationById = async (
  id: string,
): Promise<OrganizationType | any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/organizations/${id}`, {
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

export const getOrganizationByDocument = async (
  document: string,
): Promise<OrganizationType | any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(
      `${env.MANAGEMENT_API_URL}/organizations/document/${document}`,
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

export const getOrganizationVerification = async (
  document: string,
): Promise<OrganizationType | any> => {
  try {
    const data = await fetch(
      `${env.MANAGEMENT_API_URL}/organizations/verification/document/${document}`,
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
