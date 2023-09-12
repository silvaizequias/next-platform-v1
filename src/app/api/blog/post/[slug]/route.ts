import { prisma } from '@/libraries/prisma'

export const GET = async (
  request: Request,
  { params }: { params: { slug: string } },
) => {
  const { slug } = params
  try {
    await prisma?.$connect()

    return new Response(
      JSON.stringify(
        await prisma.post.findFirst({
          where: {
            slug,
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
              },
            },
          },
        }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
