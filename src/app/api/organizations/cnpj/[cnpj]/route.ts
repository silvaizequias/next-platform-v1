import { prisma } from '@/libraries/prisma'
import { NextResponse } from 'next/server'

export const GET = async (
  request: Request,
  { params }: { params: { cnpj: string } },
) => {
  const { cnpj } = params
  try {
    return new NextResponse(
      JSON.stringify(
        await prisma.organization.findFirst({
          where: { cnpj: cnpj, softDeleted: false },
          include: {
            user: true,
            users: {
              include: {
                user: {
                  select: {
                    isActive: true,
                    name: true,
                    phone: true,
                    email: true,
                    image: true,
                    profile: true,
                    zipCode: true,
                    complement: true,
                    latitude: true,
                    longitude: true,
                  },
                },
              },
            },
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
