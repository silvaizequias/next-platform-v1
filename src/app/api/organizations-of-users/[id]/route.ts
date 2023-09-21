import { prisma } from '@/libraries/prisma'
import {
  UserOrganizationUpdateSchema,
  UserOrganizationUpdateSchemaType,
} from '@/types/organization-of-user/schema'
import { Prisma } from '@prisma/client'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
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
    console.error(error)
    return new Error(error?.message || error)
  } finally {
    await prisma.$disconnect()
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    await prisma.$connect()

    return await request
      .json()
      .then(async (inputs: UserOrganizationUpdateSchemaType) => {
        if (await UserOrganizationUpdateSchema.parseAsync(inputs)) {
          const { organizationId, userId } = inputs

          const organization = await prisma.organization.findFirst({
            where: {
              id: organizationId,
            },
          })
          if (!organization)
            return new Response(
              JSON.stringify('a organização não existe no sistema'),
              {
                status: 404,
              },
            )

          const user = await prisma.user.findFirst({
            where: { id: userId },
          })
          if (!user)
            return new Response(
              JSON.stringify('o usuário não existe no sistema'),
              { status: 404 },
            )

          const data: Prisma.OrganizationOfUserUpdateInput = {
            ...inputs,
            organization: {
              update: {
                id: organizationId,
              },
            },
            user: {
              update: {
                id: userId,
              },
            },
          }

          return new Response(
            JSON.stringify(
              await prisma.organizationOfUser.update({ where: { id }, data }),
            ),
          )
        }
      })
  } catch (error: any) {
    await prisma.$disconnect()
    console.error(error)
    return new Error(error?.message || error)
  } finally {
    await prisma.$disconnect()
  }
}
