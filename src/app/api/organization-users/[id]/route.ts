import { prisma } from '@/libraries/prisma'
import {
  UpdateOrganizationUser,
  UpdateOrganizationUserType,
} from '@/types/organization-user/schema'
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
    const inputs: UpdateOrganizationUserType = await request.json()
    if (await UpdateOrganizationUser.parseAsync(inputs)) {
      const { userPhone, organizationDocumentCode } = inputs
      delete inputs?.userPhone
      delete inputs?.organizationDocumentCode

      const user = await prisma.user.findFirst({
        where: { phone: userPhone },
      })
      if (!user)
        return new Response('o usuario não existe no sistema', { status: 404 })

      const organization = await prisma.organization.findFirst({
        where: { documentCode: organizationDocumentCode },
      })
      if (!organization)
        return new Response('a organização não existe no sistema', {
          status: 404,
        })

      const data: Prisma.OrganizationUsersUpdateInput = {
        ...inputs,
        user: {
          update: {
            phone: userPhone,
          },
        },
        organization: {
          update: {
            documentCode: organizationDocumentCode,
          },
        },
      }
      return new Response(
        JSON.stringify(
          await prisma.organizationUsers.update({ where: { id: id }, data }),
        ),
        {
          status: 200,
          headers: {
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'PATCH',
            'Content-Type': 'application/json',
          },
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
