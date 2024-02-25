'use server'

import { env } from '@/environments'
import {
  CreateOrganizationKeySchemaType,
  CreateOrganizationKeySchema,
} from '@/schemas/organization-key'

export const createOrganizationKey = async (
  inputs: CreateOrganizationKeySchemaType,
): Promise<any> => {
  try {
    if (await CreateOrganizationKeySchema.parseAsync(inputs)) {
      const data = await fetch(`${env.MANAGEMENT_API_URL}/organization-keys`, {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return data && (await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
