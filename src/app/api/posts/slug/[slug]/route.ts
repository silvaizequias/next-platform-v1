import { prisma } from '@/libraries/prisma'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params
  try {
    return new Response(
      JSON.stringify(
        await prisma.post.findFirst({
          where: { slug: slug, softDeleted: false },
        }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
