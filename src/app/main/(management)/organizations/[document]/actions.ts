import { prisma } from '@/libraries/prisma'

export default async function actionGetOrganizationByParams(document: string) {
  try {
    const organization = await prisma.organization.findFirst({
      where: { documentCode: document, softDeleted: false },
      include: {
        users: {
          select: {
            id: true,
            createdAt: true,
            role: true,
            active: true,
            user: {
              select: {
                id: true,
                active: true,
                subscriber: true,
                suspended: true,
                profile: true,
                image: true,
                name: true,
                phone: true,
                email: true,
              },
            },
          },
        },
      },
    })
    if (!organization) return 'a organização não existe na plataforma'

    return organization
  } catch (error: any) {
    await prisma.$disconnect()
    throw new Error(error)
  } finally {
    await prisma.$disconnect()
  }
}
