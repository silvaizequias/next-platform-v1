'use server'

import { env } from '@/environments'
import {
  UpdateOrganizationKeySchema,
  UpdateOrganizationKeySchemaType,
} from '@/schemas/organization-key'

export const updateOrganizationKey = async (
  id: string,
  inputs: UpdateOrganizationKeySchemaType,
): Promise<any> => {
  try {
    if (await UpdateOrganizationKeySchema.parseAsync(inputs)) {
      const data = await fetch(
        `${env.MANAGEMENT_API_URL}/organization-keys/${id}`,
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
