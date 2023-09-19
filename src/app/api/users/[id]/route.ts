import { prisma } from '@/libraries/prisma'
import { UserUpdateSchema, UserUpdateSchemaType } from '@/schemas/user'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id

  try {
    await prisma.$connect()
    return new Response(
      JSON.stringify(
        await prisma.user.findFirst({
          where: { id },
          include: {
            accounts: true,
            companies: true,
            services: true,
            sessions: true,
            subscriptions: {
              include: {
                service: true,
              },
            },
          },
        }),
      ),
    )
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id

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
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
