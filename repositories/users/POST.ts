'use server'

import { env } from '@/environments'
import { CreateUserSchemaType, CreateUserSchema } from '@/schemas/user'

export const createUser = async (
  inputs: CreateUserSchemaType,
): Promise<any> => {
  try {
    if (await CreateUserSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.MANAGEMENT_API_URL}/users`, {
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
