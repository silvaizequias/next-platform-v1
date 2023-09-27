import { prisma } from '@/libraries/prisma'
import { NextResponse } from 'next/server'

export const GET = async (
  request: Request,
  { params }: { params: { phone: string } },
) => {
  const { phone } = params

  try {
    return new NextResponse(
      JSON.stringify(
        await prisma.user.findFirst({
          where: { phone: phone, softDeleted: false },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
            profile: true,
            isActive: true,
            latitude: true,
            longitude: true,
            orgs: {
              select: {
                role: true,
                isAvaliable: true,
                organization: {
                  select: {
                    id: true,
                    name: true,
                    cnpj: true,
                  },
                },
              },
            },
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
