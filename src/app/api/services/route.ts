import { ServiceCreateDTO, ServiceCreateDTOType } from '@/dto/service.dto'
import { prisma } from '@/libraries/prisma'

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
    const inputs: ServiceCreateDTOType = await request.json()
    if (await ServiceCreateDTO.parseAsync(inputs)) {
      await prisma.service.create({ data: inputs })

      return new Response(
        JSON.stringify(`o serviço ${inputs?.name} foi criado`),
        { status: 201 },
      )
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
