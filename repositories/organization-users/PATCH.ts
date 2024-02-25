'use server'

import { env } from '@/environments'
import {
  UpdateOrganizationUserSchema,
  UpdateOrganizationUserSchemaType,
} from '@/schemas/organization-user'

export const updateOrganizationUser = async (
  id: string,
  inputs: UpdateOrganizationUserSchemaType,
): Promise<any> => {
  try {
    if (await UpdateOrganizationUserSchema.parseAsync(inputs)) {
      const data = await fetch(
        `${env.MANAGEMENT_API_URL}/organization-users/${id}`,
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
