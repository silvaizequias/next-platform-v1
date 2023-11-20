import { prisma } from '@/libraries/prisma'
import {
  ServiceUpdateSchema,
  ServiceUpdateSchemaType,
} from '@/types/service/schema'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    return new Response(
      JSON.stringify(
        await prisma.service.findFirst({
          where: { id: id, softDeleted: false },
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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    const inputs: ServiceUpdateSchemaType = await request.json()
    if (await ServiceUpdateSchema.parseAsync(inputs)) {
      return new Response(
        JSON.stringify(
          await prisma.service.update({ where: { id: id }, data: inputs }),
        ),
      )
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
