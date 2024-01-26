'use server'

import { Session } from 'next-auth'

const PLATFORM_MANAGEMENT_URL = process.env.PLATFORM_MANAGEMENT_URL!

export async function actionGetMyOrganizations(session: Session) {
  try {
    const data = await fetch(
      `${PLATFORM_MANAGEMENT_URL}/organization-users/user/${session?.user?.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
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

export async function actionGetOrganizations(session: Session) {
  try {
    const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/organizations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })

    return data && await data.json()
  } catch (error: any) {
    return new Response(JSON.stringify(error?.message || error), {
      status: error?.status || 400,
    })
  }
}
