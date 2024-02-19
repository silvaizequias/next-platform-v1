'use server'

import { updateOrganization } from '@/actions/organizations/PATCH'
import {
  UpdateOrganizationSchema,
  UpdateOrganizationSchemaType,
} from '@/schemas/organization.schema'
import { revalidatePath } from 'next/cache'

export const update = async (
  id: string,
  inputs: UpdateOrganizationSchemaType,
  //document: string,
): Promise<any> => {
  try {
    if (await UpdateOrganizationSchema.parseAsync(inputs)) {
      const data = await updateOrganization(id, inputs)
      revalidatePath(`/`)
      return data
    }
  } catch (error: any) {
    return error?.message || error
  }
}
