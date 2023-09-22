import { prisma } from '@/libraries/prisma'
import {
  OrganizationCreateSchema,
  OrganizationCreateSchemaType,
} from '@/types/organization/schema'
import { Prisma } from '@prisma/client'

export const GET = async (request: Request) => {
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
    return new Response(error?.message! || error!, { status: 400 })
  }
}

export const POST = async (
  request: Request,
): Promise<OrganizationCreateSchemaType | any> => {
  try {
    await prisma.$connect()

    return await request
      .json()
      .then(async (inputs: OrganizationCreateSchemaType) => {
        if (await OrganizationCreateSchema.parseAsync(inputs)) {
          const { userDocCode } = inputs
          const user = await prisma.user.findFirst({
            where: { docCode: userDocCode },
          })
          if (!user)
            return new Response('o usuário não existe no sistema', {
              status: 404,
            })

          delete inputs?.userDocCode

          const data: Prisma.OrganizationCreateInput = {
            ...inputs,
            user: {
              connect: {
                docCode: user?.docCode!,
              },
            },
          }

          return new Response(
            JSON.stringify(await prisma.organization.create({ data })),
          )
        }
      })
  } catch (error: any) {
    return new Response(error?.message! || error!, { status: 400 })
  }
}
