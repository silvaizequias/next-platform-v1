'use server'

import { Session } from 'next-auth'
import { OrganizationType } from '../../(management)/organizations/types'
import { env } from '@/environments'

export async function actionGetOrganizationByDocument(
  document: string,
  session: Session,
): Promise<OrganizationType | any> {
  try {
    const data = await fetch(
      `${env.PLATFORM_API_URL}/organizations/document/${document}`,
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
