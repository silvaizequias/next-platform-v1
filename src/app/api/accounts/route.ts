import { prisma } from '@/libraries/prisma'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()
    return new Response(
      JSON.stringify(
        await prisma.account.findMany({
          include: {
            user: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
    process.exit(1)
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
