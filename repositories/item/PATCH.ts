'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { ITEM_REPOSITORY } from '..'
import {
  UpdateItemValidation,
  UpdateItemValidationType,
} from '@/validations/item'

export const itemRepositoryUpdate = async (
  id: string,
  inputs: UpdateItemValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await UpdateItemValidation.parseAsync(inputs)) {
      return await fetch(`${ITEM_REPOSITORY}/${id}`, {
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
