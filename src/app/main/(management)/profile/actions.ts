'use server'

import { env } from '@/environments'
import { Session } from 'next-auth'
import { UserType } from '../users/types'

export async function actionGetProfile(
  session: Session,
): Promise<UserType | any> {
  try {
    const data = await fetch(
      `${env.PLATFORM_API_URL}/users/${session?.user?.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
      },
    )
    if (!data) return null
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
