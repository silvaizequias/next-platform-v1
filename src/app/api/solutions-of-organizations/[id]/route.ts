import { prisma } from '@/libraries/prisma'
import {
  OrganizationSolutionUpdateSchema,
  OrganizationSolutionUpdateSchemaType,
} from '@/types/solution-of-organization/schema'
import { Prisma } from '@prisma/client'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  try {
    return new Response(
      JSON.stringify(
        await prisma.solutionOfOrganization.findFirst({
          where: {
            id: id,
            softDeleted: false,
          },
          include: {
            solution: true,
            organization: {
              select: {
                id: true,
                cnpj: true,
                user: {
                  select: {
                    id: true,
                    name: true,
                    phone: true,
                    docCode: true,
                    subscriptions: {
                      select: {
                        id: true,
                        isActive: true,
                        solution: {
                          select: {
                            id: true,
                            url: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        }),
      ),
    )
  } catch (error: any) {
    return new Response(error?.message! || error!, { status: 400 })
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<OrganizationSolutionUpdateSchemaType | any> => {
  const { id } = params
  const inputs: OrganizationSolutionUpdateSchemaType = await request.json()
  try {
    if (await OrganizationSolutionUpdateSchema.parseAsync(inputs)) {
      const { solutionUrl, organizationCnpj } = inputs

      const solution = await prisma.solution.findFirst({
        where: { url: solutionUrl },
      })
      if (!solution)
        return new Response('a solução não existe no sistema', {
          status: 404,
        })

      const organization = await prisma.organization.findFirst({
        where: {
          cnpj: organizationCnpj,
        },
      })
      if (!organization)
        return new Response('a organização não existe no sistema', {
          status: 404,
        })

      delete inputs?.solutionUrl
      delete inputs?.organizationCnpj

      const data: Prisma.SolutionOfOrganizationUpdateInput = {
        ...inputs,
        solution: {
          update: {
            id: solution?.id!,
          },
        },
        organization: {
          update: {
            id: organization?.id!,
          },
        },
      }
      return new Response(
        JSON.stringify(
          await prisma.solutionOfOrganization.update({
            where: { id },
            data,
          }),
        ),
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new Response(error?.message! || error!, { status: 400 })
  }
}
