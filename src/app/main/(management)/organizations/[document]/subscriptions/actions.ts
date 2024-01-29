'use server'

import { prisma } from '@/libraries/prisma'
import { Session } from 'next-auth'

export async function actionGetSubscriptionByParam(
  session: Session,
  document: string,
) {
  try {
    if (document) {
      return await prisma.subscription.findMany({
        where: { softDeleted: false, document: document },
      })
    }
    return null
  } catch (error: any) {
    await prisma.$disconnect()
    console.error(error?.message || error)
  } finally {
    await prisma.$disconnect()
  }
}
