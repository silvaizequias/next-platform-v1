'use server'

import {
  CreateOrganizationUserSchemaType,
  CreateOrganizationUserSchema,
  UpdateOrganizationUserSchemaType,
  UpdateOrganizationUserSchema,
} from '@/schemas/organization-user'
import { revalidatePath } from 'next/cache'

export const create = async (
  inputs: CreateOrganizationUserSchemaType,
  organization: string,
): Promise<any> => {
  try {
    if (await CreateOrganizationUserSchema.parseAsync(inputs)) {
      const data = null
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
      const data = null

      revalidatePath(`/${organization}/usuarios`)
      return data
    }
  } catch (error: any) {
    return error?.message || error
  }
}
