import { prisma } from '@/libraries/prisma'
import {
  UserOrganizationCreateSchema,
  UserOrganizationCreateSchemaType,
} from '@/types/organization-of-user/schema'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    await prisma.$connect()

    return new Response(
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
    console.error(error)
    return new Response(JSON.stringify(error?.message || error), { status: 400 })
  }
}

export async function POST(request: Request) {
  try {
    await prisma.$connect()

    return await request
      .json()
      .then(async (inputs: UserOrganizationCreateSchemaType) => {
        if (await UserOrganizationCreateSchema.parseAsync(inputs)) {
          const { organizationCnpj, userPhone } = inputs

          const organization = await prisma.organization.findFirst({
            where: {
              cnpj: organizationCnpj,
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
            where: { phone: userPhone },
          })
          if (!user)
            return new Response(
              JSON.stringify('o usuário não existe no sistema'),
              { status: 404 },
            )

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

          return new Response(
            JSON.stringify(await prisma.organizationOfUser.create({ data })),
          )
        }
      })
  } catch (error: any) {
    console.error(error)
    return new Response(JSON.stringify(error?.message || error), { status: 400 })
  }
}
