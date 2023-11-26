import {
  OrganizationUpdateDTO,
  OrganizationUpdateDTOType,
} from '@/dto/organization.dto'
import { prisma } from '@/libraries/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(
      JSON.stringify(
        await prisma.organization.findFirst({
          where: { id: id, softDeleted: false },
          include: {
            users: {
              select: {
                id: true,
                role: true,
                isActive: true,
                user: {
                  select: {
                    id: true,
                    profile: true,
                    isActive: true,
                    name: true,
                    image: true,
                    email: true,
                    phone: true,
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
    const inputs: OrganizationUpdateDTOType = await request.json()
    if (await OrganizationUpdateDTO.parseAsync(inputs)) {
      await prisma.organization.update({
        where: { id: id },
        data: inputs,
      })
      return new Response(JSON.stringify(`a organização foi atualizada`), {
        status: 201,
      })
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
