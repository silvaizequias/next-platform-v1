import { prisma } from '@/libraries/prisma'
import { CreateUser, CreateUserType } from '@/types/user/schema'

export async function GET(request: Request) {
  try {
    return new Response(
      JSON.stringify(
        await prisma.user.findMany({
          where: { softDeleted: false },
          select: {
            id: true,
            isActive: true,
            name: true,
            image: true,
            email: true,
            phone: true,
            zipCode: true,
            complement: true,
            latitude: true,
            longitude: true,
            organizations: {
              select: {
                id: true,
                isActive: true,
                role: true,
                organization: true,
              },
            },
          },
        }),
      ),
      { status: 200 },
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  try {
    const inputs: CreateUserType = await request.json()
    if (await CreateUser.parseAsync(inputs))
      return new Response(
        JSON.stringify(await prisma.user.create({ data: inputs })),
        { status: 201 },
      )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
