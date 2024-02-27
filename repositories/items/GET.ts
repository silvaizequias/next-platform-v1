'use server'

import { env } from '@/environments'
import { ItemType } from '@/types/item'

export const getItems = async (
  authorizationKey: string,
): Promise<ItemType[] | any> => {
  try {
    const data = await fetch(`${env.ORDERS_API_URL}/items`, {
      method: 'GET',
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

export const getItemById = async (id: string, authorizationKey: string) => {
  try {
    const data = await fetch(`${env.ORDERS_API_URL}/items/${id}`, {
      method: 'GET',
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

export const getItemByCode = async (code: string, authorizationKey: string) => {
  try {
    const data = await fetch(`${env.ORDERS_API_URL}/items/code/${code}`, {
      method: 'GET',
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
