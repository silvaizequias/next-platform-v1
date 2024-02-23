'use server'

import {
  UpdateOrganizationSchemaType,
  UpdateOrganizationSchema,
} from '@/schemas/organization'
import { revalidatePath } from 'next/cache'

export const update = async (
  id: string,
  inputs: UpdateOrganizationSchemaType,
  //document: string,
): Promise<any> => {
  try {
    if (await UpdateOrganizationSchema.parseAsync(inputs)) {
      const data = null
      revalidatePath(`/`)
      return data
    }
  } catch (error: any) {
    return error?.message || error
  }
}
