import {
  CreateOrganizationUserDTOType,
  CreateOrganizationUserDTO,
} from '@/app/main/(management)/organizations/dto'
import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export async function GET(request: Request) {
  try {
    return new Response(
      JSON.stringify(
        await prisma.organizationUsers.findMany({
          where: { softDeleted: false },
          include: {
            user: {
              select: {
                id: true,
                profile: true,
                name: true,
                email: true,
                phone: true,
              },
            },
            organization: true,
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

export async function POST(request: Request) {
  const randomCode = Math.random().toString(32).substr(2, 14)
  try {
    const inputs: CreateOrganizationUserDTOType = await request.json()
    if (await CreateOrganizationUserDTO.parseAsync(inputs)) {
      const { role, userPhone, organizationDocument } = inputs
      delete inputs?.userPhone
      delete inputs?.organizationDocument

      const organization = await prisma.organization.findFirst({
        where: { documentCode: organizationDocument, softDeleted: false },
        include: {
          users: {
            select: {
              user: {
                select: {
                  id: true,
                  active: true,
                  suspended: true,
                  profile: true,
                  phone: true,
                },
              },
            },
          },
        },
      })
      if (!organization)
        return new Response(
          JSON.stringify('a organização não existe na plataforma'),
          { status: 404 },
        )

      const user = await prisma.user.findFirst({
        where: { phone: userPhone, softDeleted: false },
      })
      if (!user) {
        const data: Prisma.OrganizationUsersCreateInput = {
          ...inputs,
          organization: {
            connect: {
              id: organization?.id,
            },
          },
          user: {
            create: {
              profile: 'member',
              name: 'usuário da ' + organization?.name?.split(' ')[0],
              phone: userPhone!,
              email: userPhone! + '@dedicado.digital',
              passHash: hashSync(randomCode, 10),
            },
          },
        }
        await prisma.organizationUsers.create({ data })
        return new Response(
          JSON.stringify(
            `o usuario foi criado e incluído na organização ${organization?.name} como ${role}`,
          ),
          { status: 201 },
        )
      }

      /*
      const organizationUser = await prisma.organizationUsers.findFirst({
        where: { userId: user?.id },
      })
      if (organizationUser?.organizationId.includes(organization?.id))
        return (
          new Response(
            JSON.stringify(
              `o usuário ${user?.name} já é ${organizationUser?.role} na organização ${organization?.name} `,
            ),
          ),
          { status: 403 }
        )
        
      */
      const data: Prisma.OrganizationUsersCreateInput = {
        ...inputs,
        organization: {
          connect: {
            id: organization?.id,
          },
        },
        user: {
          connect: {
            id: user?.id,
          },
        },
      }
      await prisma.organizationUsers.create({ data })
      return new Response(
        JSON.stringify(
          `o usuario ${user?.name} foi incluído na organização ${organization?.name} como ${role}`,
        ),
        { status: 201 },
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
