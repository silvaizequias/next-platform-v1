import { prisma } from '@/libraries/prisma'
import {
  SolutionUpdateSchema,
  SolutionUpdateSchemaType,
} from '@/types/solution/schema'
import { NextResponse } from 'next/server'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params

  try {
    return new NextResponse(
      JSON.stringify(
        await prisma.solution.findFirst({
          where: { id: id, softDeleted: false },
          include: {
            subscriptions: true,
            organizations: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<SolutionUpdateSchemaType | any> => {
  const inputs: SolutionUpdateSchemaType = await request.json()
  const { id } = params
  try {
    if (await SolutionUpdateSchema.parseAsync(inputs)) {
      return new NextResponse(
        JSON.stringify(
          await prisma.solution.update({ where: { id }, data: inputs }),
        ),
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}
