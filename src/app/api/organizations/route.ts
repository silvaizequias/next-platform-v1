import { prisma } from '@/libraries/prisma'
import {
  OrganizationCreateSchema,
  OrganizationCreateSchemaType,
} from '@/types/organization/schema'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.organization.findMany({
          where: { softDeleted: false },
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
    console.error(error)
    return new Error(error?.message || error)
  }
}

export async function POST(request: Request) {
  try {
    await prisma.$connect()

    return await request
      .json()
      .then(async (inputs: OrganizationCreateSchemaType) => {
        if (await OrganizationCreateSchema.parseAsync(inputs)) {
          const { userId } = inputs
          const user = await prisma.user.findFirst({
            where: { id: userId },
          })
          if (!user)
            return new Response(
              JSON.stringify('o usuário não existe no sistema'),
              { status: 404 },
            )

          const data: Prisma.OrganizationCreateInput = {
            ...inputs,
            user: {
              connect: {
                id: userId,
              },
            },
          }

          return new Response(
            JSON.stringify(await prisma.organization.create({ data })),
          )
        }
      })
  } catch (error: any) {
    console.error(error)
    return new Error(error?.message || error)
  }
}
