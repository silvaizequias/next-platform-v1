'use server'

import { env } from '@/environments'
import { AttachmentType } from '@/types/attachment'

export const getAttachments = async (
  authorizationKey: string,
): Promise<AttachmentType[] | any> => {
  try {
    const data = await fetch(`${env.ORDERS_API_URL}/attachments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorizationKey: authorizationKey,
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}

export const getAttachmentById = async (
  id: string,
  authorizationKey: string,
): Promise<AttachmentType | any> => {
  try {
    const data = await fetch(`${env.ORDERS_API_URL}/attachments/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorizationKey: authorizationKey,
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}
