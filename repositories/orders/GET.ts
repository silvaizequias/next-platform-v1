'use server'

import { env } from '@/environments'
import { OrderType } from '@/types/order'

export const getOrders = async (): Promise<OrderType[] | any> => {
  try {
    const data = await fetch(`${env.ORDERS_API_URL}/orders`, {
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

export const getOrderById = async (id: string): Promise<OrderType | any> => {
  try {
    const data = await fetch(`${env.ORDERS_API_URL}/orders/${id}`, {
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

export const getOrderByCode = async (
  code: string,
): Promise<OrderType | any> => {
  try {
    const data = await fetch(`${env.ORDERS_API_URL}/orders/code/${code}`, {
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

export const getOrdersByOrganization = async (
  organization: string,
): Promise<OrderType[] | any> => {
  try {
    const data = await fetch(
      `${env.ORDERS_API_URL}/orders/organization/${organization}`,
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

export const getOrdersByCustomer = async (
  customer: string,
): Promise<OrderType[] | any> => {
  try {
    const data = await fetch(
      `${env.ORDERS_API_URL}/orders/customer/${customer}`,
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

export const getOrdersByMember = async (
  member: string,
): Promise<OrderType[] | any> => {
  try {
    const data = await fetch(`${env.ORDERS_API_URL}/orders/member/${member}`, {
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
