import {
  OrganizationUserUpdateDTO,
  OrganizationUserUpdateDTOType,
} from '@/dto/organization.dto'
import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(
      JSON.stringify(
        await prisma.organizationUsers.findFirst({
          where: { id: id },
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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    const inputs: OrganizationUserUpdateDTOType = await request.json()
    if (await OrganizationUserUpdateDTO.parseAsync(inputs)) {
      const { userEmail, organizationDocumentCode } = inputs
      delete inputs?.userEmail
      delete inputs?.organizationDocumentCode

      const user = await prisma.user.findFirst({
        where: { email: userEmail },
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

      const data: Prisma.OrganizationUsersUpdateInput = {
        ...inputs,
        user: {
          update: {
            email: userEmail,
          },
        },
        organization: {
          update: {
            documentCode: organizationDocumentCode,
          },
        },
      }
      await prisma.organizationUsers.update({ where: { id: id }, data })

      return new Response(JSON.stringify(`as informações foram atualizadas`), {
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
