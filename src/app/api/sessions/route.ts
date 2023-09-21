import { prisma } from '@/libraries/prisma'
export async function GET(request: Request) {
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.session.findMany({ where: { softDeleted: false } }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
    console.error(error)
    return new Response(JSON.stringify(error?.message || error), { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
