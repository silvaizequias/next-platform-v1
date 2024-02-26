'use server'

import { env } from '@/environments'
import { UpdateNoteSchema, UpdateNoteSchemaType } from '@/schemas/note'

export const updateNote = async (
  id: string,
  inputs: UpdateNoteSchemaType,
  authorizationKey: string,
): Promise<any> => {
  try {
    if (await UpdateNoteSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.ORDERS_API_URL}/notes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          authorizationKey: authorizationKey,
        },
      })
      return data && (await data.json())
    }
  } catch (error: any) {
    return error?.message || error
  }
}
