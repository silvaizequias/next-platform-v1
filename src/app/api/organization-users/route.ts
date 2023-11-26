import {
  OrganizationUserCreateDTO,
  OrganizationUserCreateDTOType,
} from '@/dto/organization.dto'
import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    return new Response(
      JSON.stringify(
        await prisma.organizationUsers.findMany({
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            isActive: true,
            role: true,
            organization: {
              select: {
                id: true,
                name: true,
                image: true,
                email: true,
                phone: true,
                documentCode: true,
                zipCode: true,
                complement: true,
                latitude: true,
                longitude: true,
              },
            },
            user: {
              select: {
                id: true,
                profile: true,
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

export async function POST(request: Request) {
  try {
    const inputs: OrganizationUserCreateDTOType = await request.json()
    if (await OrganizationUserCreateDTO.parseAsync(inputs)) {
      const { userPhone, organizationDocumentCode } = inputs
      delete inputs?.userPhone
      delete inputs?.organizationDocumentCode

      const user = await prisma.user.findFirst({
        where: { phone: userPhone },
      })
      if (!user)
        return new Response(JSON.stringify('o usuario não existe no sistema'), {
          status: 404,
        })

      const organization = await prisma.organization.findFirst({
        where: { documentCode: organizationDocumentCode },
      })
      if (!organization)
        return new Response(
          JSON.stringify('a organização não existe no sistema'),
          {
            status: 404,
          },
        )

      const data: Prisma.OrganizationUsersCreateInput = {
        ...inputs,
        user: {
          connect: {
            phone: userPhone,
          },
        },
        organization: {
          connect: {
            documentCode: organizationDocumentCode,
          },
        },
      }
      await prisma.organizationUsers.create({ data })

      return new Response(
        JSON.stringify(
          `o usuário ${user?.name} foi inserido na organização ${organization?.name}`,
        ),
        {
          status: 201,
        },
      )
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
