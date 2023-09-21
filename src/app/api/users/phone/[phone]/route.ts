import { prisma } from '@/libraries/prisma'

export default async function GET(
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
    return new Error(error?.message || error)
  } finally {
    await prisma.$disconnect()
  }
}
