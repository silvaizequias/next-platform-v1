import { prisma } from '@/libraries/prisma'
import {
  SubscriptionUpdateSchema,
  SubscriptionUpdateSchemaType,
} from '@/types/subscriptions/schema'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  try {
    return new NextResponse(
      JSON.stringify(
        await prisma.subscription.findFirst({
          where: { id: id, softDeleted: false },
          include: {
            user: true,
            solution: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    return new NextResponse(JSON.stringify(error?.message || error), {
      status: 400,
    })
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<SubscriptionUpdateSchemaType | any> => {
  const { id } = params
  const inputs: SubscriptionUpdateSchemaType = await request.json()
  try {
    if (await SubscriptionUpdateSchema.parseAsync(inputs)) {
      const { userDocCode, solutionUrl, discount, tax, amount } = inputs
      const user = await prisma.user.findFirst({
        where: { docCode: userDocCode, softDeleted: false, isActive: true },
      })
      if (!user)
        return new NextResponse(
          JSON.stringify('esta conta não pode contratar serviços'),
          { status: 403 },
        )

      const solution = await prisma.solution.findFirst({
        where: { url: solutionUrl },
      })
      if (!solution)
        return new NextResponse(
          JSON.stringify('a solução não está disponível para contratação'),
          { status: 404 },
        )

      delete inputs?.userDocCode
      delete inputs?.solutionUrl

      const data: Prisma.SubscriptionUpdateInput = {
        ...inputs,
        user: {
          update: {
            id: user?.id!,
          },
        },
        solution: {
          update: {
            id: solution?.id!,
          },
        },
      }

      return new NextResponse(
        JSON.stringify(
          await prisma.subscription.update({ where: { id }, data }),
        ),
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new NextResponse(JSON.stringify(error?.message || error), {
      status: 400,
    })
  }
}
