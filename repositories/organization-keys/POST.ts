'use server'

import { env } from '@/environments'
import { nextAuthOptions } from '@/libraries/next-auth'
import {
  CreateOrganizationKeySchemaType,
  CreateOrganizationKeySchema,
} from '@/schemas/organization-key'
import { getServerSession } from 'next-auth'

export const createOrganizationKey = async (
  inputs: CreateOrganizationKeySchemaType,
): Promise<any> => {
  try {
    const session = await getServerSession(nextAuthOptions)
    if (await CreateOrganizationKeySchema.parseAsync(inputs)) {
      const data = await fetch(`${env.MANAGEMENT_API_URL}/organization-keys`, {
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
