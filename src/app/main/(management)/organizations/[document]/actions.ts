import { prisma } from '@/libraries/prisma'

const PLATFORM_MANAGEMENT_URL = process.env.PLATFORM_MANAGEMENT_URL!

export default async function actionGetOrganizationByParams(document: string) {
  try {
    const data = await fetch(
      `${PLATFORM_MANAGEMENT_URL}/organizations/document/${document}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return await data.json()
  } catch (error: any) {
    await prisma.$disconnect()
    throw new Error(error)
  } finally {
    await prisma.$disconnect()
  }
}
