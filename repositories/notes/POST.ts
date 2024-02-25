'use server'

import { env } from '@/environments'
import { CreateNoteSchema, CreateNoteSchemaType } from '@/schemas/note'

export const createNote = async (
  inputs: CreateNoteSchemaType,
): Promise<any> => {
  try {
    if (await CreateNoteSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.ORDERS_API_URL}/notes`, {
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
