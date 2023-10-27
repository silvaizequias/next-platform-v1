import { prisma } from '@/libraries/prisma'
import {
  CreateOrganizationUser,
  CreateOrganizationUserType,
} from '@/types/organization-user/schema'
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
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Content-Type': 'application/json',
        },
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
    const inputs: CreateOrganizationUserType = await request.json()
    if (await CreateOrganizationUser.parseAsync(inputs)) {
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
      return new Response(
        JSON.stringify(await prisma.organizationUsers.create({ data })),
        {
          status: 200,
          headers: {
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
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
