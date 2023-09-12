import { prismaDedicated } from '@/libraries/prisma'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id

  try {
    await prismaDedicated.$connect()
    return new Response(
      JSON.stringify(
        await prismaDedicated.session.findFirst({
          where: { id },
          include: {
            user: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prismaDedicated.$disconnect()
  }
}
