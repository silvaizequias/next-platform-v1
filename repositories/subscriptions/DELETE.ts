'use server'

import { env } from '@/environments'

export const deleteSubscriptions = async (id: string): Promise<any> => {
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/subscriptions/${id}`, {
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

export const softDeleteSubscriptions = async (id: string): Promise<any> => {
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/subscriptions/${id}`, {
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
