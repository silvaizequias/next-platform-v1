'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { ORDER_REPOSITORY } from '..'
import {
  OrderUpdateValidation,
  OrderUpdateValidationType,
} from '@/validations/order'

export const orderRepositoryUpdate = async (
  id: string,
  inputs: OrderUpdateValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await OrderUpdateValidation.parseAsync(inputs)) {
      return await fetch(`${ORDER_REPOSITORY}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization,
        },
      }).then(async (data) => await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
