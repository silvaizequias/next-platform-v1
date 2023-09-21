import { prisma } from '@/libraries/prisma'

export async function GET(request: Request) {
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
    console.error(error)
    return new Error(error?.message || error)
  } finally {
    await prisma.$disconnect()
  }
}
