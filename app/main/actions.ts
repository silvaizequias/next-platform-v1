'use server'

import { getOrdersByMember } from '@/repositories/orders/GET'
import { getOrganizationUserByUserId } from '@/repositories/organization-users/GET'
import { getOrganizationByDocument } from '@/repositories/organizations/GET'
import { OrganizationType } from '@/types/organization'
import { OrganizationUserType } from '@/types/organization-user'

export const actionGetOrganizationUserByUserId = async (): Promise<
  OrganizationUserType[] | any
> => {
  return await getOrganizationUserByUserId()
}

export const actionGetOrdersByMember = async (member: string): Promise<any> => {
  const document = '52378516000178'
  const { authorizationKey }: OrganizationType | any =
    await getOrganizationByDocument(document)
  const apiKey = authorizationKey.authorizationKey

  if (!apiKey) return null

  return await getOrdersByMember(member, apiKey)
}
