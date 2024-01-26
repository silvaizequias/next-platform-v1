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

    return data && await data.json()
  } catch (error: any) {
    return new Response(JSON.stringify(error?.message || error), {
      status: error?.status || 400,
    })
  }
}
