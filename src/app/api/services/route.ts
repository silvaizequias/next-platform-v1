import { prisma } from '@/libraries/prisma'
import {
  ServiceCreateSchema,
  ServiceCreateSchemaType,
} from '@/types/service/schema'

export async function GET(request: Request) {
  try {
    return new Response(
      JSON.stringify(
        await prisma.service.findMany({
          where: { softDeleted: false },
          include: {
            subscriptions: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  try {
    const inputs: ServiceCreateSchemaType = await request.json()
    if (await ServiceCreateSchema.parseAsync(inputs)) {
      return new Response(
        JSON.stringify(await prisma.service.create({ data: inputs })),
      )
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
