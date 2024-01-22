
import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'
import { UpdateOrganizationDTOType, UpdateOrganizationDTO } from '../dto'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    return new Response(
      JSON.stringify(
        await prisma.organization.findFirst({
          where: { id: id, softDeleted: false },
          orderBy: { name: 'asc' },
          include: {
            users: {
              select: {
                user: {
                  select: {
                    id: true,
                    active: true,
                    suspended: true,
                    profile: true,
                    image: true,
                    name: true,
                    email: true,
                    phone: true,
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
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params

    const inputs: UpdateOrganizationDTOType = await request.json()
    if (await UpdateOrganizationDTO.parseAsync(inputs)) {
      const organization = await prisma.organization.findFirst({
        where: { id: id, softDeleted: false },
      })
      if (!organization)
        return new Response(
          JSON.stringify(`a organização ${id} não existe na plataforma`),
          { status: 404 },
        )

      const data: Prisma.OrganizationUpdateInput = {
        ...inputs,
      }
      await prisma.organization.update({ where: { id: id }, data })

      return new Response(
        JSON.stringify(
          `as informações da organização ${data.name} foram atualizadas`,
        ),
      )
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
