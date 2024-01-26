'use server'

import { Session } from 'next-auth'

const PLATFORM_MANAGEMENT_URL = process.env.PLATFORM_MANAGEMENT_URL!

export async function actionGetOrganizationKeys(session: Session) {
  try {
    const data = await fetch(`${PLATFORM_MANAGEMENT_URL}/organization-keys`, {
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
