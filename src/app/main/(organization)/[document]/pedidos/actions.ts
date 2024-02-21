'use server'

import { env } from '@/environments'
import { getUserByDocument } from '@/repositories/users/GET'
import {
  CreateOrderSchema,
  CreateOrderSchemaType,
} from '@/schemas/order.schema'
import { OrderType } from '@/types/order.type'
import { UserType } from '@/types/user.type'
import getAddress, { AddressType } from '@/utils/get-address'
import { revalidatePath } from 'next/cache'

export const findOrdersByOrganization = async (
  organization: string,
): Promise<OrderType[] | any> => {
  try {
    const data = await fetch(
      `${env.ORDER_API_URL}/orders/organization/${organization}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (!data) return null
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}

export const createOrder = async (
  inputs: CreateOrderSchemaType,
): Promise<OrderType[] | any> => {
  try {
    if (await CreateOrderSchema.parseAsync(inputs)) {
      const customer: UserType = await getUserByDocument(inputs?.customer)

      const { lat, lng }: AddressType = await getAddress(customer?.zipCode)

      const data = await fetch(`${env.ORDER_API_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify({
          ...inputs,
          destinationZipCode: customer?.zipCode,
          destinationComplement: customer?.complement,
          destinationLatitude: customer?.latitude || Number(lat),
          destinationLongitude: customer?.longitude || Number(lng),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!data) return null
      revalidatePath(`/${inputs?.organization}/pedidos`)
      return data && (await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
