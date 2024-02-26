'use server'

import { env } from '@/environments'
import { nextAuthOptions } from '@/libraries/next-auth'
import {
  UpdateOrganizationKeySchema,
  UpdateOrganizationKeySchemaType,
} from '@/schemas/organization-key'
import { getServerSession } from 'next-auth'

export const updateOrganizationKey = async (
  id: string,
  inputs: UpdateOrganizationKeySchemaType,
): Promise<any> => {
  try {
    const session = await getServerSession(nextAuthOptions)
    if (await UpdateOrganizationKeySchema.parseAsync(inputs)) {
      const data = await fetch(
        `${env.MANAGEMENT_API_URL}/organization-keys/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(inputs),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user?.authorization}`,
          },
        },
      )
      return data && (await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
