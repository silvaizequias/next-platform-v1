import { UserUpdateDTO, UserUpdateDTOType } from '@/dto/user.dto'
import { prisma } from '@/libraries/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(
      JSON.stringify(
        await prisma.user.findFirst({
          where: { id: id, softDeleted: false },
          include: {
            organizations: {
              select: {
                id: true,
                isActive: true,
                role: true,
                organization: {
                  select: {
                    id: true,
                    image: true,
                    name: true,
                    phone: true,
                    email: true,
                    documentCode: true,
                    zipCode: true,
                    complement: true,
                    latitude: true,
                    longitude: true,
                  },
                },
              },
            },
          },
        }),
      ),
      {
        status: 200,
      },
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
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
    const inputs: UserUpdateDTOType = await request.json()
    if (await UserUpdateDTO.parseAsync(inputs))
      return new Response(
        JSON.stringify(
          await prisma.user.update({ where: { id: id }, data: inputs }),
        ),
        {
          status: 201,
        },
      )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
