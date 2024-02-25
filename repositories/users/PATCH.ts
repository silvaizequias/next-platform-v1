'use server'

import { env } from '@/environments'
import { UpdateUserSchemaType } from '@/schemas/user'

export const updateUser = async (
  id: string,
  inputs: UpdateUserSchemaType,
): Promise<any> => {
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(inputs),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}
