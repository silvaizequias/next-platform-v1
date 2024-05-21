'use server'

import { organizationRepositoryCreateForUser } from '@/repositories/organization/POST'
import { OrganizationType } from '@/types/organization'
import { CreateOrganizationValidationType } from '@/validations/organization'
import { revalidatePath, revalidateTag } from 'next/cache'

export const createOrganizationForUser = async (
  inputs: CreateOrganizationValidationType,
): Promise<OrganizationType | any> => {
  return await organizationRepositoryCreateForUser(inputs)
    .then(async (data: any) => {
      revalidateTag('organizations')
      revalidateTag('subscriptions')
      revalidatePath('/')

      return data
    })
    .catch((error: any) => {
      return error?.message
    })
}
