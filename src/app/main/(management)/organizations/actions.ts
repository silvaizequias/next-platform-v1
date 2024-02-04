'use server'

import { env } from '@/environments'
import { Session } from 'next-auth'
import { OrganizationType } from './types'

export async function actionGetOrganizations(
  session: Session,
): Promise<OrganizationType[] | any> {
  try {
    const data = await fetch(`${env.PLATFORM_API_URL}/organizations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.authorization}`,
      },
    })
    if (!data) return null
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
