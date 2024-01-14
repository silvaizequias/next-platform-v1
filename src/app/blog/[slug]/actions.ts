'use server'

import { prisma } from '@/libraries/prisma'

export async function actionGetPostByParams(slug: string) {
  try {
    const publication = await prisma.publication.findFirst({
      where: { slug: slug, softDeleted: false },
    })
    if (!publication) return null

    return publication
  } catch (error: any) {
    await prisma.$disconnect()
    throw new Error(error)
  } finally {
    await prisma.$disconnect()
  }
}
