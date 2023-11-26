import {
  SubscriptionUpdateDTO,
  SubscriptionUpdateDTOType,
} from '@/dto/subscription.dto'
import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    return new Response(
      JSON.stringify(
        await prisma.subscription.findFirst({
          where: { id: id, softDeleted: false },
          include: {
            service: true,
            user: {
              select: {
                id: true,
                isActive: true,
                profile: true,
                name: true,
                email: true,
                phone: true,
                organizations: true,
              },
            },
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
    const inputs: SubscriptionUpdateDTOType = await request.json()
    if (await SubscriptionUpdateDTO.parseAsync(inputs)) {
      const { userEmail, serviceSolution } = inputs
      delete inputs.userEmail, delete inputs.serviceSolution

      if (!userEmail) {
        return new Response(
          JSON.stringify(
            await prisma.subscription.update({
              where: { id: id },
              data: { ...inputs },
            }),
          ),
        )
      }

      if (!serviceSolution) {
        return new Response(
          JSON.stringify(
            await prisma.subscription.update({
              where: { id: id },
              data: { ...inputs },
            }),
          ),
        )
      }

      const user = await prisma.user.findFirst({
        where: { email: userEmail },
      })
      if (!user)
        return new Response(JSON.stringify('o usuário não existe'), {
          status: 404,
        })

      const service = await prisma.service.findFirst({
        where: { solution: serviceSolution },
      })
      if (!service)
        return new Response(JSON.stringify('o serviço não existe'), {
          status: 404,
        })

      const data: Prisma.SubscriptionUpdateInput = {
        ...inputs,
        user: {
          update: {
            email: userEmail,
          },
        },
        service: {
          update: {
            solution: serviceSolution,
          },
        },
      }
      await prisma.subscription.update({ where: { id: id }, data })

      return new Response(
        JSON.stringify(
          `a contratação do serviço ${service?.name} foi atualizada`,
        ),
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
