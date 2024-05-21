'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { ATTACHMENT_REPOSITORY } from '..'
import {
  CreateAttachmentValidation,
  CreateAttachmentValidationType,
} from '@/validations/attachment'

export const attachmentRepositoryCreate = async (
  inputs: CreateAttachmentValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (await CreateAttachmentValidation.parseAsync(inputs)) {
      return await fetch(`${ATTACHMENT_REPOSITORY}`, {
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
