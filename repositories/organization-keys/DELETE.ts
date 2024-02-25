'use server'

import { env } from '@/environments'

export const deleteOrganizationKey = async (id: string): Promise<any> => {
  try {
    const data = await fetch(
      `${env.MANAGEMENT_API_URL}/organization-keys/${id}`,
      {
        method: 'DELETE',
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

export const softDeleteOrganizationKey = async (id: string): Promise<any> => {
  try {
    const data = await fetch(
      `${env.MANAGEMENT_API_URL}/organization-keys/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ softDeleted: true }),
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
