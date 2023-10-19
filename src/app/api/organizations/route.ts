import { prisma } from '@/libraries/prisma'
import {
  CreateOrganization,
  CreateOrganizationType,
} from '@/types/organization/schema'

export async function GET(request: Request) {
  try {
    return new Response(
      JSON.stringify(
        await prisma.organization.findMany({
          where: { softDeleted: false },
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
    const inputs: CreateOrganizationType = await request.json()
    if (await CreateOrganization.parseAsync(inputs))
      return new Response(
        JSON.stringify(await prisma.organization.create({ data: inputs })),
        { status: 201 },
      )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
