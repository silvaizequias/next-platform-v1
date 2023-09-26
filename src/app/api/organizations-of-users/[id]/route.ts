import { prisma } from '@/libraries/prisma'
import {
  UserOrganizationUpdateSchema,
  UserOrganizationUpdateSchemaType,
} from '@/types/organization-of-user/schema'
import { Prisma } from '@prisma/client'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  try {
    await prisma.$connect()

    return new Response(
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
    await prisma.$disconnect()
    return new Response(error?.message! || error!, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<UserOrganizationUpdateSchemaType | any> => {
  const { id } = params
  try {
    await prisma.$connect()

    return await request
      .json()
      .then(async (inputs: UserOrganizationUpdateSchemaType) => {
        if (await UserOrganizationUpdateSchema.parseAsync(inputs)) {
          const { organizationCnpj, userPhone } = inputs

          const organization = await prisma.organization.findFirst({
            where: {
              cnpj: organizationCnpj,
            },
          })
          if (!organization)
            return new Response('a organização não existe no sistema', {
              status: 404,
            })

          const user = await prisma.user.findFirst({
            where: { phone: userPhone },
          })
          if (!user)
            return new Response('o usuário não existe no sistema', {
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

          return new Response(
            JSON.stringify(
              await prisma.organizationOfUser.update({ where: { id }, data }),
            ),
            { status: 201 },
          )
        }
      })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message! || error!, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
