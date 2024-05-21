'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import {
  UploadFileValidation,
  UploadFileValidationType,
} from '@/validations/upload'
import { getServerSession } from 'next-auth'
import { UPLOAD_REPOSITORY } from '..'

export const uploadFileRepository = async (
  file: File,
  inputs: UploadFileValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const authorization = session?.user?.authorization ?? ''

  try {
    if (file && (await UploadFileValidation.parseAsync(inputs))) {
      const { name, bucket } = inputs
      let data = new FormData()
      data.append('name', name)
      data.append('bucket', bucket)
      data.append('file', file)

      return await fetch(`${UPLOAD_REPOSITORY}`, {
        method: 'POST',
        body: data,
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
