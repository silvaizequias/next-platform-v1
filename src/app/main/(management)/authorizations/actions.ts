'use server'

import { Session } from 'next-auth'

const PLATFORM_URL = process.env.PLATFORM_URL!

export async function actionGetOrganizationKeys(session: Session) {
  try {
    const data = await fetch(`${PLATFORM_URL}/organization-keys`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })

    return data && (await data.json())
  } catch (error: any) {
    throw new Error(error)
  }
}
