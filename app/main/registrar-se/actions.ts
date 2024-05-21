'use server'

import { userRepositoryCreate } from '@/repositories/user/POST'
import { RegisterValidationType } from '@/validations/register'
import { revalidatePath, revalidateTag } from 'next/cache'

export const registerUser = async (
  inputs: RegisterValidationType,
): Promise<any> => {
  return await userRepositoryCreate({ ...inputs, profile: 'consumer' }).then(
    async () => {
      revalidateTag('users')
      revalidatePath('/')
    },
  )
}
