import { env } from '@/environments'
import { nextAuthOptions } from '@/libraries/next-auth'
import { SubscriptionType } from '@/types/subscription'
import { getServerSession } from 'next-auth'
;('use server')

export const getSubscriptions = async (): Promise<SubscriptionType[] | any> => {
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/subscriptions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
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
  const session = await getServerSession(nextAuthOptions)
  try {
    const data = await fetch(`${env.MANAGEMENT_API_URL}/subscriptions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })
    return data && (await data.json())
  } catch (error: any) {
    return error?.message || error
  }
}
