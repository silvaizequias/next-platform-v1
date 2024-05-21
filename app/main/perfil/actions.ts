'use server'

import { nextAuthOptions } from '@/libraries/next-auth'
import { userRepositoryUpdate } from '@/repositories/user/PATCH'

import {
  ProfileLocationUpdateValidationType,
  ProfilePasswordUpdateValidationType,
  ProfileUpdateValidationType,
} from '@/validations/profile'
import { getServerSession } from 'next-auth'
import { revalidatePath, revalidateTag } from 'next/cache'

export const updateProfile = async (
  inputs: ProfileUpdateValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const userId = session?.user?.id ?? ''

  if (!session) return null

  return await userRepositoryUpdate(userId, inputs).then((data: any) => {
    revalidateTag('user')
    revalidateTag('member')
    revalidateTag('organization')
    revalidatePath('/perfil')
    return data
  })
}

export const updateProfileAvailable = async (
  available: boolean,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const userId = session?.user?.id ?? ''

  if (!session) return null

  return await userRepositoryUpdate(userId, { available: available }).then(
    (data: any) => {
      revalidateTag('user')
      revalidateTag('member')
      revalidateTag('organization')
      revalidatePath('/')
      return data
    },
  )
}

export const updateProfileAvatar = async (image: string): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const userId = session?.user?.id ?? ''

  if (!session) return null

  return await userRepositoryUpdate(userId, { image: image }).then(
    (data: any) => {
      revalidateTag('user')
      revalidateTag('member')
      revalidateTag('organization')
      revalidatePath('/profile')

      return data
    },
  )
}

export const updateProfileLocation = async (
  inputs: ProfileLocationUpdateValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const userId = session?.user?.id ?? ''

  if (!session) return null

  return await userRepositoryUpdate(userId, inputs).then((data: any) => {
    revalidateTag('user')
    revalidateTag('member')
    revalidateTag('organization')
    revalidatePath('/')

    return data
  })
}

export const updateProfilePassword = async (
  inputs: ProfilePasswordUpdateValidationType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  const userId = session?.user?.id ?? ''

  if (!session) return null

  const { newPassword } = inputs
  return await userRepositoryUpdate(userId, { password: newPassword })
}
