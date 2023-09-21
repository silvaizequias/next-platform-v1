import { prisma } from '@/libraries/prisma'
import {
  OrganizationUpdateSchema,
  OrganizationUpdateSchemaType,
} from '@/types/organization/schema'
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
      .then(async (inputs: OrganizationUpdateSchemaType) => {
        if (await OrganizationUpdateSchema.parseAsync(inputs)) {
          const { userId } = inputs
          const user = await prisma.user.findFirst({
            where: { id: userId },
          })
          if (!user)
            return new Response(
              JSON.stringify('o usuário não existe no sistema'),
              { status: 404 },
            )

          if (!userId)
            return new Response(
              JSON.stringify(
                await prisma.organization.update({
                  where: { id },
                  data: inputs,
                }),
              ),
            )

          const data: Prisma.OrganizationUpdateInput = {
            ...inputs,
            user: {
              update: {
                id: userId,
              },
            },
          }

          return new Response(
            JSON.stringify(
              await prisma.organization.update({ where: { id }, data }),
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
