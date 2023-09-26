import { prisma } from '@/libraries/prisma'
export const GET = async (request: Request) => {
  try {
    return new Response(
      JSON.stringify(
        await prisma.session.findMany({ where: { softDeleted: false } }),
      ),
    )
  } catch (error: any) {
    return new Response(error?.message! || error!, { status: 400 })
  }
}
