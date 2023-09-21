import { prisma } from '@/libraries/prisma'

export async function GET(
  request: Request,
  { params }: { params: { phone: string } },
) {
  const { phone } = params

  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.user.findFirst({
          where: { phone: phone, softDeleted: false },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
            profile: true,
            isActive: true,
            latitude: true,
            longitude: true,
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
          },
        }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
    console.error(error)
    return new Response(JSON.stringify(error?.message || error), {
      status: 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
