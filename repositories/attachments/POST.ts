'use server'

import { env } from '@/environments'
import {
  CreateAttachmentSchema,
  CreateAttachmentSchemaType,
} from '@/schemas/attachment'

export const createAttachment = async (
  inputs: CreateAttachmentSchemaType,
  authorizationKey: string,
): Promise<any> => {
  const randomCode = Math.random().toString(32).substr(2, 16)
  try {
    if (await CreateAttachmentSchema.parseAsync(inputs)) {
      const data = await fetch(`${env.ORDERS_API_URL}/attachments`, {
        method: 'POST',
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
