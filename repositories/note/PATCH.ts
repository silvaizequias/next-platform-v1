'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { NOTE_REPOSITORY } from '..'
import {
  UpdateNoteValidation,
  UpdateNoteValidationType,
} from '@/validations/note'

export const noteRepositoryUpdate = async (
  id: string,
  inputs: UpdateNoteValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await UpdateNoteValidation.parseAsync(inputs)) {
      return await fetch(`${NOTE_REPOSITORY}/${id}`, {
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
