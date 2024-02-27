'use server'

import { env } from '@/environments'
import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'

export const deleteOrganizationUser = async (id: string): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(
      `${env.MANAGEMENT_API_URL}/organization-users/${id}`,
      {
        method: 'DELETE',
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

export const softDeleteOrganizationUser = async (id: string): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(
      `${env.MANAGEMENT_API_URL}/organization-users/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ softDeleted: true }),
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
