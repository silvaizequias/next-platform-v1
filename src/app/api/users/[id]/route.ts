import { prisma } from '@/libraries/prisma'
import { UserUpdateSchema, UserUpdateSchemaType } from '@/types/user/schema'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
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
            contracts: true,
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

    return await request.json().then(async (inputs: UserUpdateSchemaType) => {
      if (await UserUpdateSchema.parseAsync(inputs)) {
        return new Response(
          JSON.stringify(
            await prisma.user.update({ where: { id }, data: inputs }),
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
