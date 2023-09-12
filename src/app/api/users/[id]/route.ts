import { prismaDedicated } from '@/libraries/prisma'
import { UserUpdateSchema, UserUpdateSchemaType } from '@/schemas/user'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id

  try {
    await prismaDedicated.$connect()
    return new Response(
      JSON.stringify(
        await prismaDedicated.user.findFirst({
          where: { id },
          include: {
            accounts: true,
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
    await prismaDedicated.$disconnect()
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id

  try {
    await prismaDedicated.$connect()

    return await request.json().then(async (inputs: UserUpdateSchemaType) => {
      if (await UserUpdateSchema.parseAsync(inputs)) {
        return new Response(
          JSON.stringify(
            await prismaDedicated.user.update({ where: { id }, data: inputs }),
          ),
        )
      }
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: 400,
    })
  } finally {
    await prismaDedicated.$disconnect()
  }
}
