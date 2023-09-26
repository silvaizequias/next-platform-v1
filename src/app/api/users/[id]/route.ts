import { prisma } from '@/libraries/prisma'
import { UserUpdateSchema, UserUpdateSchemaType } from '@/types/user/schema'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.user.findFirst({
          where: { id: id, softDeleted: false },
          include: {
            accounts: {
              select: {
                id: true,
                type: true,
                provider: true,
              },
            },
            subscriptions: true,
            organizations: true,
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
            sessions: {
              select: {
                sessionToken: true,
                expires: true,
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
): Promise<UserUpdateSchemaType | any> => {
  const { id } = params
  try {
    await prisma.$connect()

    return await request.json().then(async (inputs: UserUpdateSchemaType) => {
      if (await UserUpdateSchema.parseAsync(inputs)) {
        await prisma.user.update({ where: { id }, data: inputs })
        return new Response(
          JSON.stringify('as informações foram atualizadas!'),
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
