'use server'

import { env } from '@/environments'

export const deleteOrder = async (
  id: string,
  authorizationKey: string,
): Promise<any> => {
  try {
    const data = await fetch(`${env.ORDERS_API_URL}/orders/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorizationKey: authorizationKey,
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}

export const softDeleteOrder = async (
  id: string,
  authorizationKey: string,
): Promise<any> => {
  try {
    const data = await fetch(`${env.ORDERS_API_URL}/orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ softDeleted: true }),
      headers: {
        'Content-Type': 'application/json',
        authorizationKey: authorizationKey,
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}
