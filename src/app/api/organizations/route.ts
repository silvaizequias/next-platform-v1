import {
  CreateOrganizationDTO,
  CreateOrganizationDTOType,
} from '@/app/management/organizations/dto'
import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    return new Response(
      JSON.stringify(
        await prisma.organization.findMany({
          where: { softDeleted: false },
          orderBy: { name: 'asc' },
          include: {
            users: {
              select: {
                userId: true,
              },
            },
          },
        }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: error?.status || 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  try {
    const inputs: CreateOrganizationDTOType = await request.json()
    if (await CreateOrganizationDTO.parseAsync(inputs)) {
      const { name, documentCode } = inputs
      const organization = await prisma.organization.findFirst({
        where: { documentCode: documentCode },
      })
      if (organization)
        return new Response(
          JSON.stringify(`a organização ${name} já existe na plataforma`),
          {
            status: 409,
          },
        )

      const data: Prisma.OrganizationCreateInput = {
        ...inputs,
      }
      await prisma.organization.create({ data })

      return new Response(
        JSON.stringify(`a organização ${name} foi criada no sistema`),
        {
          status: 201,
        },
      )
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: error?.status || 400 })
  } finally {
    await prisma.$disconnect()
  }
}
