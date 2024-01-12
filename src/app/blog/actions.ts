'use server'

import { prisma } from '@/libraries/prisma'

export async function actionGetPosts() {
  try {
    const publications = await prisma.publication.findMany({
      where: { softDeleted: false },
      orderBy: { updatedAt: 'desc' },
    })
    if (!publications) return null

    return publications
  } catch (error: any) {
    await prisma.$disconnect()
    throw new Error(error)
  } finally {
    await prisma.$disconnect()
  }
}
