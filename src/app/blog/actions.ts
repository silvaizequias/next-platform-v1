'use server'

import { prisma } from '@/libraries/prisma'

const PUBLICATION_API_URL = process.env.PUBLICATION_API_URL!
const PUBLICATION_AUTHORIZATION_KEY = process.env.PUBLICATION_AUTHORIZATION_KEY!

export async function actionGetPublications() {
  const organization = '52378516000178'
  try {
    const response = await fetch(
      `${PUBLICATION_API_URL}/domains/organization/${organization}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          authorization: PUBLICATION_AUTHORIZATION_KEY,
        },
      },
    )
    if (!response) return null
    const domain = response && (await response.json())
    const { publications } = domain

    return publications
  } catch (error: any) {
    await prisma.$disconnect()
    throw new Error(error)
  } finally {
    await prisma.$disconnect()
  }
}
