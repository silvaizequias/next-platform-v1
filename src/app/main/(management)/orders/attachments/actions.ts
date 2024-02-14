'use server'

import { env } from '@/environments'
import { OrderAttachmentType } from './types'

export async function actionGetOrderAttachments(
  authorizationKey: string,
): Promise<OrderAttachmentType[] | any> {
  try {
    const data = await fetch(`${env.ORDER_API_URL}/attachments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorizationKey: authorizationKey,
      },
    })
    if (!data) return null
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
