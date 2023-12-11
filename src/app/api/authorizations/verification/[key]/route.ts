import { prisma } from '@/libraries/prisma'

export async function GET(
  request: Request,
  { params }: { params: { key: string } },
) {
  const { key } = params
  const dateTimeNow = new Date().getTime()
  try {
    if (!key) return new Response(JSON.stringify(false), { status: 403 })

    const authorization = await prisma.authorization.findFirst({
      where: { apiKey: key, softDeleted: false, isActive: true },
      select: {
        expireIn: true,
        role: true,
        solution: true,
      },
    })

    const dateTime = authorization?.expireIn?.getTime()

    if (dateTime && dateTime < dateTimeNow)
      return new Response(
        JSON.stringify(
          `Esta chave está expirada desde ${authorization?.expireIn?.toLocaleDateString()}`,
        ),
        { status: 403 },
      )

    return new Response(JSON.stringify(authorization), {
      status: 200,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Accept,Content-Type',
      },
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
