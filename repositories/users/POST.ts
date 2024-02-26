'use server'

import { env } from '@/environments'
import { nextAuthOptions } from '@/libraries/next-auth'
import { CreateUserSchemaType, CreateUserSchema } from '@/schemas/user'
import { getServerSession } from 'next-auth'

export const createUser = async (
  inputs: CreateUserSchemaType,
): Promise<any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    if (await CreateUserSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.MANAGEMENT_API_URL}/users`, {
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
