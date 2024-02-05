'use server'

import { env } from '@/environments'
import { Session } from 'next-auth'
import { OrganizationKeyType } from './types'

export async function actionGetOrganizationKeys(
  session: Session,
): Promise<OrganizationKeyType[] | any> {
  try {
    const data = await fetch(`${env.PLATFORM_API_URL}/organization-keys`, {
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
