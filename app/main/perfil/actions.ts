import { getUserById } from '@/repositories/users/GET'
import { updateUser } from '@/repositories/users/PATCH'
import { ProfileUpdateSchemaType } from '@/schemas/profile'
import { UserType } from '@/types/user'
import { Session } from 'next-auth'
import { revalidatePath } from 'next/cache'

export const actionGetProfile = async (
  session: Session,
): Promise<UserType | any> => {
  return await getUserById(session?.user?.id!)
}

export const actionUpdateProfile = async (
  id: string,
  inputs: ProfileUpdateSchemaType,
): Promise<any> => {
  const data = await updateUser(id, inputs)
  return data
}
