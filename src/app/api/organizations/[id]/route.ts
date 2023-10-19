import { prisma } from '@/libraries/prisma'
import {
  UpdateOrganization,
  UpdateOrganizationType,
} from '@/types/organization/schema'

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
      { status: 200 },
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
    const inputs: UpdateOrganizationType = await request.json()
    if (await UpdateOrganization.parseAsync(inputs))
      return new Response(
        JSON.stringify(
          await prisma.organization.update({
            where: { id: id },
            data: inputs,
          }),
        ),
        { status: 201 },
      )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
