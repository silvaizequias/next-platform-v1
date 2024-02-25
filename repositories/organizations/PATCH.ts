'use server'

import { env } from '@/environments'
import {
  UpdateOrganizationSchema,
  UpdateOrganizationSchemaType,
} from '@/schemas/organization'

export const updateOrganization = async (
  id: string,
  inputs: UpdateOrganizationSchemaType,
): Promise<any> => {
  try {
    if (await UpdateOrganizationSchema.parseAsync(inputs)) {
      const data = await fetch(
        `${env.MANAGEMENT_API_URL}/organizations/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(inputs),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      return data && (await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
