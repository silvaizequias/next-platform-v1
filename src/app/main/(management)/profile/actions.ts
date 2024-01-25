'use server'

import { Session } from 'next-auth'

const PLATFORM_MANAGEMENT_URL = process.env.PLATFORM_MANAGEMENT_URL!

export async function actionGetProfile(session: Session) {
  try {
    const data = await fetch(
      `${PLATFORM_MANAGEMENT_URL}/users/${session?.user?.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return await data.json()
  } catch (error: any) {
    throw new Error(error)
  }
}
