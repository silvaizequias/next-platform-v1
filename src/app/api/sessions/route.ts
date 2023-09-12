import { prismaDedicated } from '@/libraries/prisma'

export const GET = async (request: Request) => {
  try {
    await prismaDedicated.$connect()
    return new Response(
      JSON.stringify(
        await prismaDedicated.session.findMany({
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
