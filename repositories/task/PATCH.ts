'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { TASK_REPOSITORY } from '..'
import {
  UpdateTaskValidation,
  UpdateTaskValidationType,
} from '@/validations/task'

export const taskRepositoryUpdate = async (
  id: string,
  inputs: UpdateTaskValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await UpdateTaskValidation.parseAsync(inputs)) {
      return await fetch(`${TASK_REPOSITORY}/${id}`, {
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
