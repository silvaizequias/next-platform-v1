'use server'

import { getOrganizationUserByUserId } from '@/repositories/organization-users/GET'
import { OrganizationUserType } from '@/types/organization-user'
import { Session } from 'next-auth'

export const actionGetOrganizationUserByUserId = async (): Promise<
  OrganizationUserType[] | any
> => {
  return await getOrganizationUserByUserId()
}
