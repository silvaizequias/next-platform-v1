import { ServiceUpdateDTO, ServiceUpdateDTOType } from '@/dto/service.dto'
import { prisma } from '@/libraries/prisma'

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
    const inputs: ServiceUpdateDTOType = await request.json()
    if (await ServiceUpdateDTO.parseAsync(inputs)) {
      await prisma.service.update({ where: { id: id }, data: inputs })
      return new Response(JSON.stringify(`o serviço foi atualizado`), {
        status: 201,
      })
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
