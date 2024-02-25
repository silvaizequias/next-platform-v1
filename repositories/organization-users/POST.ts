'use server'

import { env } from '@/environments'
import {
  CreateOrganizationUserSchemaType,
  CreateOrganizationUserSchema,
} from '@/schemas/organization-user'

export const createOrganizationUser = async (
  inputs: CreateOrganizationUserSchemaType,
): Promise<any> => {
  const randomCode = Math.random().toString(32).substr(2, 14)
  try {
    if (await CreateOrganizationUserSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.MANAGEMENT_API_URL}/organization-users`, {
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
