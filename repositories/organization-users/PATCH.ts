'use server'

import { env } from '@/environments'
import { nextAuthOptions } from '@/libraries/next-auth'
import {
  UpdateOrganizationUserSchema,
  UpdateOrganizationUserSchemaType,
} from '@/schemas/organization-user'
import { getServerSession } from 'next-auth'

export const updateOrganizationUser = async (
  id: string,
  inputs: UpdateOrganizationUserSchemaType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    if (await UpdateOrganizationUserSchema.parseAsync(inputs)) {
      const data = await fetch(
        `${env.MANAGEMENT_API_URL}/organization-users/${id}`,
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
