'use server'

import { updateOrganizationUser } from '@/actions/organization-users/PATCH'
import { postOrganizationUser } from '@/actions/organization-users/POST'
import {
  CreateOrganizationUserSchema,
  CreateOrganizationUserSchemaType,
  UpdateOrganizationUserSchema,
  UpdateOrganizationUserSchemaType,
} from '@/schemas/organization-user.schema'
import { revalidatePath } from 'next/cache'

export const create = async (
  inputs: CreateOrganizationUserSchemaType,
  organization: string,
): Promise<any> => {
  try {
    if (await CreateOrganizationUserSchema.parseAsync(inputs)) {
      const data = await postOrganizationUser(inputs)
      revalidatePath(`/${organization}/usuarios`)
      return data
    }
  } catch (error: any) {
    return error?.message || error
  }
}

export const update = async (
  id: string,
  inputs: UpdateOrganizationUserSchemaType,
  organization: string,
): Promise<any> => {
  try {
    if (await UpdateOrganizationUserSchema.parseAsync(inputs)) {
      const data = await updateOrganizationUser(id, inputs)

      revalidatePath(`/${organization}/usuarios`)
      return data
    }
  } catch (error: any) {
    return error?.message || error
  }
}
