import { prisma } from '@/libraries/prisma'
import {
  SolutionCreateSchema,
  SolutionCreateSchemaType,
} from '@/types/solution/schema'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  try {
    return new NextResponse(
      JSON.stringify(
        await prisma.solution.findMany({
          where: { softDeleted: false },
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

export const POST = async (
  request: Request,
): Promise<SolutionCreateSchemaType | any> => {
  const inputs: SolutionCreateSchemaType = await request.json()
  try {
    if (await SolutionCreateSchema.parseAsync(inputs)) {
      return new NextResponse(
        JSON.stringify(await prisma.solution.create({ data: inputs })),
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}
