'use server'

import { prisma } from '@/libraries/prisma'

const PUBLICATION_API_URL = process.env.PUBLICATION_API_URL!
const PUBLICATION_AUTHORIZATION_KEY = process.env.PUBLICATION_AUTHORIZATION_KEY!

export async function actionGetPublicationByParams(slug: string) {
  try {
    const publication = await fetch(
      `${PUBLICATION_API_URL}/publications/slug/${slug}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          authorization: PUBLICATION_AUTHORIZATION_KEY,
        },
      },
    )
    if (!publication) return null

    return publication && (await publication.json())
  } catch (error: any) {
    await prisma.$disconnect()
    throw new Error(error)
  } finally {
    await prisma.$disconnect()
  }
}
