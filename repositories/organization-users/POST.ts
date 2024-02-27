'use server'

import { env } from '@/environments'
import { nextAuthOptions } from '@/libraries/next-auth'
import {
  CreateOrganizationUserSchemaType,
  CreateOrganizationUserSchema,
} from '@/schemas/organization-user'
import { getServerSession } from 'next-auth'

export const createOrganizationUser = async (
  inputs: CreateOrganizationUserSchemaType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    if (await CreateOrganizationUserSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.MANAGEMENT_API_URL}/organization-users`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      })
      return data && (await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
