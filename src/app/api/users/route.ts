import { prisma } from '@/libraries/prisma'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()
    return new Response(JSON.stringify(await prisma.user.findMany()))
  } catch (error: any) {
    return new Response(JSON.stringify(error?.message || error), {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
