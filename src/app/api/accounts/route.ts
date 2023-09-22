import { prisma } from '@/libraries/prisma'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.account.findMany({
          where: { softDeleted: false },
        }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error)
  } finally {
    await prisma.$disconnect()
  }
}
