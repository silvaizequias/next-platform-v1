'use server'

import { env } from '@/environments'

export const deleteUser = async (id: string): Promise<any> => {
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}

export const softDeleteUser = async (id: string): Promise<any> => {
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ softDeleted: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}
