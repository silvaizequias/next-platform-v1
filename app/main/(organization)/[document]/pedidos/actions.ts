'use server'

import { orderRepositoryUpdate } from '@/repositories/order/PATCH'
import { orderRepositoryCreate } from '@/repositories/order/POST'
import { organizationRepositoryFindByDocument } from '@/repositories/organization/GET'
import { userRepositoryFindByDocument } from '@/repositories/user/GET'
import { OrganizationType } from '@/types/organization'
import { UserType } from '@/types/user'
import { getAddressByZipCode } from '@/utils/handle-address'
import { AddressByZipCodeType } from '@/utils/handle-address/types'
//import { getRoutesByCoordinates } from '@/utils/handle-location'
import {
  OrderCreateValidation,
  OrderCreateValidationType,
  OrderUpdateValidationType,
} from '@/validations/order'
import { revalidatePath, revalidateTag } from 'next/cache'

export const createOrder = async (
  inputs: OrderCreateValidationType,
): Promise<any> => {
  try {
    if (await OrderCreateValidation.parseAsync(inputs)) {
      const organization: OrganizationType | any =
        await organizationRepositoryFindByDocument(inputs?.organization)
      if (organization?.response?.error) return organization

      const organizationAddress: AddressByZipCodeType | any =
        await getAddressByZipCode(organization?.zipCode)

      const customer: UserType | any = await userRepositoryFindByDocument(
        inputs?.customer,
      )
      if (customer?.response?.error) return customer

      const customerAddress: AddressByZipCodeType | any =
        await getAddressByZipCode(customer?.zipCode)

      //const coordinates = await getRoutesByCoordinates({
      //  destination: {
      //    latitude: customer?.latitude || customerAddress?.lat,
      //    longitude: customer?.longitude || customerAddress?.lng,
      //  },
      //  origin: {
      //    latitude: organization?.latitude || organizationAddress?.lat,
      //    longitude: organization?.longitude || organizationAddress?.lng,
      //  },
      //})

      return await orderRepositoryCreate({
        ...inputs,
        originZipCode:
          organization?.zipCode || organizationAddress?.cep || null,
        originLatitude:
          organization?.latitude || organizationAddress?.lat || null,
        originLongitude:
          organization?.longitude || organizationAddress?.lng || null,
        originComplement:
          organization?.complement || organizationAddress?.district || null,
        destinationZipCode: customer?.zipCode || customerAddress?.cep || null,
        destinationLatitude: customer?.latitude || customerAddress?.lat || null,
        destinationLongitude:
          customer?.longitude || customerAddress?.lng || null,
        destinationComplement:
          customer?.complement || customerAddress?.district || null,
      }).then((data: any) => {
        revalidateTag('orders')
        revalidatePath(`/${inputs?.organization}/pedidos`)
        return data
      })
    }
  } catch (error: any) {
    return error?.message || 'ocorreu um erro inesperado'
  }
}

export const updateOrder = async (
  id: string,
  inputs: OrderUpdateValidationType,
): Promise<any> => {
  return await orderRepositoryUpdate(id, inputs).then((data: any) => {
    revalidateTag('order')
    revalidatePath('/')

    return data
  })
}
