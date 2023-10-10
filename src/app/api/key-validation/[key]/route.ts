import { prisma } from '@/libraries/prisma'
import { NextResponse } from 'next/server'

export const GET = async (
  request: Request,
  { params }: { params: { key: string } },
) => {
  const { key } = params
  try {
    return new NextResponse(
      JSON.stringify(
        await prisma.apiKey.findFirst({
          where: {
            key: key,
            softDeleted: false,
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                isActive: true,
                profile: true,
              },
            },
          },
        }),
      ),
    )
  } catch (error: any) {
    return new NextResponse(error?.message || error, { status: 400 })
  }
}
