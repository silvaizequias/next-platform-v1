'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import {
  UserUpdateValidation,
  UserUpdateValidationType,
} from '@/validations/user'
import { getServerSession } from 'next-auth'
import { USER_REPOSITORY } from '..'

export const userRepositoryUpdate = async (
  id: string,
  inputs: UserUpdateValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await UserUpdateValidation.parseAsync(inputs)) {
      return await fetch(`${USER_REPOSITORY}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authorization}`,
        },
      }).then(async (data) => await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
