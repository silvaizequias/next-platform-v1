import { prisma } from '@/libraries/prisma'

export const GET = async (
  request: Request,
  { params }: { params: { key: string } },
) => {
  const { key } = params
  try {
    return new Response(
      JSON.stringify(
        await prisma.apiKey.findFirst({
          where: {
            key: key,
            softDeleted: false,
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                isActive: true,
                profile: true,
              },
            },
          },
        }),
      ),
    )
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
