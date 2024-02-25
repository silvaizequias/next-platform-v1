'use server'

import { getOrganizationUserByUserId } from '@/repositories/organization-users/GET'
import { OrganizationUserType } from '@/types/organization-user'

export const actionGetOrganizationUserByUserId = async (
  id: string,
): Promise<OrganizationUserType[] | any> => {
  return await getOrganizationUserByUserId(id)
}
