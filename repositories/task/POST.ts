'use server'

import { nextAuthOptions } from '@/libraries/next-auth'

import { getServerSession } from 'next-auth'
import { TASK_REPOSITORY } from '..'
import {
  CreateTaskValidation,
  CreateTaskValidationType,
} from '@/validations/task'

export const taskRepositoryCreate = async (
  inputs: CreateTaskValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await CreateTaskValidation.parseAsync(inputs)) {
      return await fetch(`${TASK_REPOSITORY}`, {
        method: 'POST',
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
