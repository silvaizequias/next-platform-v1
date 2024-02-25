'use server'

import { env } from '@/environments'
import {
  CreateOrganizationSchemaType,
  CreateOrganizationSchema,
} from '@/schemas/organization'

export const createOrganization = async (
  inputs: CreateOrganizationSchemaType,
): Promise<any> => {
  try {
    if (await CreateOrganizationSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.MANAGEMENT_API_URL}/organizations`, {
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

export const createOrganizationForUser = async (
  inputs: CreateOrganizationSchemaType,
  phone: string,
) => {
  const randomCode = Math.random().toString(32).substr(2, 14)
  try {
    if (await CreateOrganizationSchema.parseAsync(inputs)) {
      const data = await fetch(
        `${env.MANAGEMENT_API_URL}/organizations/for-user/${phone}`,
        {
          method: 'POST',
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
