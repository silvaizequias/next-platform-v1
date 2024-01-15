import { prisma } from '@/libraries/prisma'

export async function GET(
  request: Request,
  { params }: { params: { phone: string } },
) {
  try {
    const { phone } = params
    return new Response(
      JSON.stringify(
        await prisma.user.findFirst({
          where: { phone: phone, softDeleted: false },
          select: {
            id: true,
            active: true,
            subscriber: true,
            suspended: true,
            profile: true,
            name: true,
            image: true,
            email: true,
            latitude: true,
            longitude: true,
          },
        }),
      ),
      { status: 200 },
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
