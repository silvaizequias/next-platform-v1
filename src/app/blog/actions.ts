'use server'

import actionGetOrganizationByDocument from '../main/(management)/organizations/[document]/actions'
import { OrganizationType } from '../main/(management)/organizations/types'

const PUBLICATION_URL = process.env.PUBLICATION_URL!

export async function actionGetPublications() {
  try {
    const organization: OrganizationType | any =
      await actionGetOrganizationByDocument('52378516000178')

    const data = await fetch(
      `${PUBLICATION_URL}/publications/organization/${organization?.document}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          authorizationKey: organization?.apiKey?.authorizationKey,
        },
        //next: { revalidate: 3600 },
      },
    )
    if (!data) return null
    return data && (await data.json())
  } catch (error: any) {
    throw new Error(error)
  }
}
