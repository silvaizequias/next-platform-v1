import { prisma } from '@/libraries/prisma'
import {
  UserOrganizationCreateSchema,
  UserOrganizationCreateSchemaType,
} from '@/types/organization-of-user/schema'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  try {
    return new NextResponse(
      JSON.stringify(
        await prisma.organizationOfUser.findMany({
          where: { softDeleted: false },
          include: {
            user: {
              select: {
                name: true,
                phone: true,
                email: true,
                image: true,
                profile: true,
              },
            },
            organization: {
              select: {
                name: true,
                cnpj: true,
                image: true,
                email: true,
                phone: true,
              },
            },
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
): Promise<UserOrganizationCreateSchemaType | any> => {
  const inputs: UserOrganizationCreateSchemaType = await request.json()
  try {
    if (await UserOrganizationCreateSchema.parseAsync(inputs)) {
      const { organizationCnpj, userPhone } = inputs

      const organization = await prisma.organization.findFirst({
        where: {
          cnpj: organizationCnpj,
        },
      })
      if (!organization)
        return new NextResponse('a organização não existe no sistema', {
          status: 404,
        })

      const user = await prisma.user.findFirst({
        where: { phone: userPhone },
      })
      if (!user)
        return new NextResponse('o usuário não existe no sistema', {
          status: 404,
        })

      delete inputs?.organizationCnpj
      delete inputs?.userPhone

      const data: Prisma.OrganizationOfUserCreateInput = {
        ...inputs,
        organization: {
          connect: {
            id: organization?.id!,
          },
        },
        user: {
          connect: {
            id: user?.id,
          },
        },
      }

      return (
        new NextResponse(
          JSON.stringify(await prisma.organizationOfUser.create({ data })),
        ),
        { status: 201 }
      )
    }
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}
