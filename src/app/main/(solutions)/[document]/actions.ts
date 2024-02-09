'use server'

import { Session } from 'next-auth'
import { OrganizationType } from '../../(management)/organizations/types'
import { env } from '@/environments'
import { prisma } from '@/libraries/prisma'

export async function actionGetOrganizationByDocument(
  document: string,
  session: Session,
): Promise<OrganizationType | any> {
  try {
    const data = await fetch(
      `${env.PLATFORM_API_URL!}/organizations/document/${document}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user?.authorization}`,
        },
        //next: { revalidate: 3600 },
      },
    )
    if (!data) return null
    return data && (await data.json())
  } catch (error: any) {
    console.error(error?.message || error)
  }
}

export async function actionGetOrganizationApiSpend(document: string) {
  try {
    const spending = await prisma.apiSpend.count({
      where: { document: document },
    })
    if (!spending) return 0

    return spending
  } catch (error: any) {
    await prisma.$disconnect()
    console.error(error?.message || error)
  } finally {
    await prisma.$disconnect()
  }
}
