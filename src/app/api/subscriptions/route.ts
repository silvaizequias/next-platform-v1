import {
  SubscriptionCreateDTO,
  SubscriptionCreateDTOType,
} from '@/dto/subscription.dto'
import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    return new Response(
      JSON.stringify(
        await prisma.subscription.findMany({
          where: { softDeleted: false },
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

export async function POST(request: Request) {
  try {
    const inputs: SubscriptionCreateDTOType = await request.json()
    if (await SubscriptionCreateDTO.parseAsync(inputs)) {
      const { userEmail, serviceSolution } = inputs
      delete inputs.userEmail, delete inputs.serviceSolution

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

      const data: Prisma.SubscriptionCreateInput = {
        ...inputs,
        user: {
          connect: {
            email: userEmail,
          },
        },
        service: {
          connect: {
            solution: serviceSolution,
          },
        },
      }
      await prisma.subscription.create({ data })

      return new Response(
        JSON.stringify(`${user?.name} contratou o serviço ${service?.name}`),
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
