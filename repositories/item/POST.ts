'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { ITEM_REPOSITORY } from '..'
import {
  CreateItemValidation,
  CreateItemValidationType,
} from '@/validations/item'

export const itemRepositoryCreate = async (
  inputs: CreateItemValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await CreateItemValidation.parseAsync(inputs)) {
      return await fetch(`${ITEM_REPOSITORY}`, {
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
