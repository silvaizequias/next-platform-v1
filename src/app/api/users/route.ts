import { prisma } from '@/libraries/prisma'
import { UserCreateSchema, UserCreateSchemaType } from '@/schemas/user'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()
    return new Response(JSON.stringify(await prisma.user.findMany()))
  } catch (error: any) {
    return new Response(JSON.stringify(error?.message || error), {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}

export const POST = async (request: Request) => {
  try {
    await prisma.$connect()

    return await request.json().then(async (inputs: UserCreateSchemaType) => {
      if (await UserCreateSchema.parseAsync(inputs)) {
        return new Response(
          JSON.stringify(await prisma.user.create({ data: inputs })),
        )
      }
    })
  } catch (error: any) {
    return new Response(JSON.stringify(error?.message || error), {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
