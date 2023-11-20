import { prisma } from '@/libraries/prisma'

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(request.method))
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  try {
    const inputs = await request.json()
    if (inputs) {
      return new Response(JSON.stringify(request.method))
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
