import { prisma } from '@/libraries/prisma'
import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  try {
    if (session) {
      return new Response(JSON.stringify(''))
    }

    return new Response(JSON.stringify('acesso não autorizado'), {
      status: 403,
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
