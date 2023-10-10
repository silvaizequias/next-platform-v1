import { prisma } from '@/libraries/prisma'
import {
  UserOrganizationUpdateSchema,
  UserOrganizationUpdateSchemaType,
} from '@/types/organization-of-user/schema'
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
        await prisma.organizationOfUser.findFirst({
          where: { id: id, softDeleted: false },
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

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<UserOrganizationUpdateSchemaType | any> => {
  const { id } = params
  const inputs: UserOrganizationUpdateSchemaType = await request.json()
  try {
    if (await UserOrganizationUpdateSchema.parseAsync(inputs)) {
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

      const data: Prisma.OrganizationOfUserUpdateInput = {
        ...inputs,
        organization: {
          update: {
            id: organization?.id!,
          },
        },
        user: {
          update: {
            id: user?.id!,
          },
        },
      }

      return new NextResponse(
        JSON.stringify(
          await prisma.organizationOfUser.update({ where: { id }, data }),
        ),
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}
