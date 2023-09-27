import { prisma } from '@/libraries/prisma'
import {
  OrganizationUpdateSchema,
  OrganizationUpdateSchemaType,
} from '@/types/organization/schema'
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
        await prisma.organization.findFirst({
          where: { id: id, softDeleted: false },
          include: {
            user: true,
            users: {
              select: {
                userId: true,
                role: true,
                isAvaliable: true,
                user: {
                  select: {
                    name: true,
                    phone: true,
                    email: true,
                    image: true,
                    profile: true,
                    docType: true,
                    docCode: true,
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

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<OrganizationUpdateSchemaType | any> => {
  const { id } = params
  const inputs: OrganizationUpdateSchemaType = await request.json()
  try {
    if (await OrganizationUpdateSchema.parseAsync(inputs)) {
      const { userDocCode } = inputs
      const user = await prisma.user.findFirst({
        where: { docCode: userDocCode },
      })
      if (!user)
        return new NextResponse('o usuário não existe no sistema', {
          status: 404,
        })

      if (!inputs?.userDocCode)
        return new NextResponse(
          JSON.stringify(
            await prisma.organization.update({
              where: { id },
              data: inputs,
            }),
          ),
        )

      delete inputs?.userDocCode

      const data: Prisma.OrganizationUpdateInput = {
        ...inputs,
        user: {
          update: {
            docCode: user?.docCode!,
          },
        },
      }

      return new NextResponse(
        JSON.stringify(
          await prisma.organization.update({ where: { id }, data }),
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
