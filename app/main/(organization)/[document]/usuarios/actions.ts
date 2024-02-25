'use server'

import { updateOrganizationUser } from '@/repositories/organization-users/PATCH'
import { createOrganizationUser } from '@/repositories/organization-users/POST'
import {
  CreateOrganizationUserSchemaType,
  UpdateOrganizationUserSchemaType,
} from '@/schemas/organization-user'
import { revalidatePath } from 'next/cache'

export const create = async (
  inputs: CreateOrganizationUserSchemaType,
): Promise<any> => {
  const data = await createOrganizationUser(inputs)
  revalidatePath(`/${inputs?.organizationDocument}/usuarios`)
  return data
}

export const update = async (
  id: string,
  inputs: UpdateOrganizationUserSchemaType,
  organization: string,
): Promise<any> => {
  const data = await updateOrganizationUser(id, inputs)
  revalidatePath(`/${organization}/usuarios`)
  return data
}
