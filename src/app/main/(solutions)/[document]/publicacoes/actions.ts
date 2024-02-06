'use server'

import { PublicationType } from '@/app/main/(management)/publications/types'
import { env } from 'process'

export async function actionGetMyOrganizationPublications(
  authorizationKey: string,
  organizationDocument: string,
): Promise<PublicationType[] | any> {
  try {
    const data = await fetch(
      `${env.PUBLICATION_API_URL}/subscriptions/organization/${organizationDocument}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorizationKey: authorizationKey,
        },
        next: { revalidate: 3600 },
      },
    )
    if (!data) return null
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}
