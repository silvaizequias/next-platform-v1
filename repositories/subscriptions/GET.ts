import { env } from '@/environments'
import { SubscriptionType } from '@/types/subscription'
;('use server')

export const getSubscriptions = async (): Promise<SubscriptionType[] | any> => {
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/subscriptions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}

export const getSubscriptionById = async (
  id: string,
): Promise<SubscriptionType | any> => {
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/subscriptions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}
