'use server'

import { env } from '@/environments'
import {
  UpdateAttachmentSchema,
  UpdateAttachmentSchemaType,
} from '@/schemas/attachment'

export const updateAttachment = async (
  id: string,
  inputs: UpdateAttachmentSchemaType,
  authorizationKey: string,
): Promise<any> => {
  try {
    if (await UpdateAttachmentSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.ORDERS_API_URL}/attachments/${id}`, {
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
