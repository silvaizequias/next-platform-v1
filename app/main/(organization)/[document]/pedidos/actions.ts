'use server'

import { getOrdersByOrganization } from '@/repositories/orders/GET'
import { createOrder } from '@/repositories/orders/POST'
import { getUserByDocument } from '@/repositories/users/GET'
import { CreateOrderSchemaType } from '@/schemas/order'
import { OrderType } from '@/types/order'
import { UserType } from '@/types/user'
import getAddress, { AddressType } from '@/utils/get-address'
import { revalidatePath } from 'next/cache'

export const actionGetOrdersByOrganization = async (
  document: string,
  authorizationKey: string,
): Promise<OrderType[] | any> => {
  return await getOrdersByOrganization(document, authorizationKey)
}

export const actionCreateOrder = async (
  inputs: CreateOrderSchemaType,
  authorizationKey: string,
): Promise<OrderType[] | any> => {
  const customer: UserType | any = await getUserByDocument(inputs?.customer)
  if (customer) {
    const { lat, lng }: AddressType = await getAddress(customer?.zipCode)
    const latitude = (Number(lat) as number) || null
    const longitude = (Number(lng) as number) || null
    const data = await createOrder(
      {
        ...inputs,
        destinationZipCode: customer?.zipCode,
        destinationComplement: customer?.complement,
        destinationLatitude: customer?.latitude || latitude,
        destinationLongitude: customer?.longitude || longitude,
      },
      authorizationKey,
    )
    revalidatePath(`/${inputs?.organization}/pedidos`)
    return data
  } else {
    const data = await createOrder(inputs, authorizationKey)
    revalidatePath(`/${inputs?.organization}/pedidos`)
    return data
  }
}
