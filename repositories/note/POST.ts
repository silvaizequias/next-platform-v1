'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { NOTE_REPOSITORY } from '..'
import {
  CreateNoteValidation,
  CreateNoteValidationType,
} from '@/validations/note'

export const noteRepositoryCreate = async (
  inputs: CreateNoteValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await CreateNoteValidation.parseAsync(inputs)) {
      return await fetch(`${NOTE_REPOSITORY}`, {
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
