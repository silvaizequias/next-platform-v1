'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import {
  OrderCreateValidation,
  OrderCreateValidationType,
} from '@/validations/order'
import { getServerSession } from 'next-auth'
import { ORDER_REPOSITORY } from '..'

export const orderRepositoryCreate = async (
  inputs: OrderCreateValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await OrderCreateValidation.parseAsync(inputs)) {
      return await fetch(`${ORDER_REPOSITORY}`, {
        method: 'POST',
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
