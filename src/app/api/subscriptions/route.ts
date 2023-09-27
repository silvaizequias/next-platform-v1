import { prisma } from '@/libraries/prisma'
import {
  SubscriptionCreateSchema,
  SubscriptionCreateSchemaType,
} from '@/types/subscriptions/schema'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  try {
    return new NextResponse(
      JSON.stringify(
        await prisma.subscription.findMany({
          where: { softDeleted: false },
          include: {
            user: true,
            solution: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}

export const POST = async (
  request: Request,
): Promise<SubscriptionCreateSchemaType | any> => {
  const inputs: SubscriptionCreateSchemaType = await request.json()
  try {
    if (await SubscriptionCreateSchema.parseAsync(inputs)) {
      const { userDocCode, solutionUrl, discount, tax, amount } = inputs
      const user = await prisma.user.findFirst({
        where: { docCode: userDocCode, softDeleted: false, isActive: true },
      })
      if (!user)
        return new NextResponse('esta conta não pode contratar serviços', {
          status: 403,
        })

      const solution = await prisma.solution.findFirst({
        where: { url: solutionUrl },
      })
      if (!solution)
        return new NextResponse('a solução não está disponível para contratação', {
          status: 404,
        })

      const totalAmount: number = Math.floor(amount! - discount! + tax!)

      delete inputs?.userDocCode
      delete inputs?.solutionUrl

      const data: Prisma.SubscriptionCreateInput = {
        ...inputs,
        amount: totalAmount,
        user: {
          connect: {
            id: user?.id!,
          },
        },
        solution: {
          connect: {
            id: solution?.id!,
          },
        },
      }
      return new NextResponse(
        JSON.stringify(await prisma.subscription.create({ data })),
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}
