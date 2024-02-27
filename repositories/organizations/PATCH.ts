'use server'

import { env } from '@/environments'
import { nextAuthOptions } from '@/libraries/next-auth'
import {
  UpdateOrganizationSchema,
  UpdateOrganizationSchemaType,
} from '@/schemas/organization'
import { getServerSession } from 'next-auth'

export const updateOrganization = async (
  id: string,
  inputs: UpdateOrganizationSchemaType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    if (await UpdateOrganizationSchema.parseAsync(inputs)) {
      const data = await fetch(
        `${env.MANAGEMENT_API_URL}/organizations/${id}`,
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
