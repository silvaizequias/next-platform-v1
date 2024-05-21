'use server'

import { getServerSession } from 'next-auth'
import { HandleUploadImageType, HandleUploadFileType } from './types'
import { nextAuthOptions } from '@/libraries/next-auth'
import { organizationRepositoryUpdate } from '@/repositories/organization/PATCH'
import { revalidatePath, revalidateTag } from 'next/cache'
import { attachmentRepositoryUpdate } from '@/repositories/attachment/PATCH'
import { userRepositoryUpdate } from '@/repositories/user/PATCH'

import { uploadFileRepository } from '@/repositories/upload/POST'

export const handleUploadFileToS3 = async ({
  data,
  name,
}: HandleUploadFileType): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)

  const fileName = name ? `${session?.user?.id}/${name}` : session?.user?.id

  try {
    if (!session) return null

    const file: File | null = (data.get('file') as File) || null

    return await uploadFileRepository(file, {
      name: fileName!,
      bucket: 'dedicated-platform',
    })
  } catch (error: any) {
    return error?.message || 'ocorreu um erro inesperado'
  }
}

export const handleUploadImage = async ({
  imageUrl,
  param,
  paramId,
}: HandleUploadImageType) => {
  const session = await getServerSession(nextAuthOptions)
  const userId = session?.user?.id ?? ''

  if (!session) return null

  switch (param) {
    case 'attachment':
      return await attachmentRepositoryUpdate(paramId!, {
        file: imageUrl,
      })
        .then((data) => {
          revalidatePath('/')
          revalidateTag('attachment')

          return data
        })
        .catch((error) => error?.message)

    case 'organization':
      return await organizationRepositoryUpdate(paramId!, {
        image: imageUrl,
      })
        .then((data) => {
          revalidatePath('/')
          revalidateTag('organization')

          return data
        })
        .catch((error) => error?.message)

    case 'user':
      return await userRepositoryUpdate(userId, { image: imageUrl })
        .then((data) => {
          revalidatePath('/profile')
          revalidateTag('users')

          return data
        })
        .catch((error) => error?.message)

    default:
      return null
  }
}
