'use server'

import { env } from '@/environments'
import { OrganizationType } from '@/types/organization'

export const getOrganizations = async (): Promise<OrganizationType[] | any> => {
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/organizations`, {
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

export const getOrganizationById = async (
  id: string,
): Promise<OrganizationType | any> => {
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/organizations/${id}`, {
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

export const getOrganizationByDocument = async (
  document: string,
): Promise<OrganizationType | any> => {
  try {
    const data = await fetch(
      `${env.MANAGEMENT_API_URL}/organizations/document/${document}`,
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
