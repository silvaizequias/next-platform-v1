import { prisma } from '@/libraries/prisma'
import {
  OrganizationSolutionUpdateSchema,
  OrganizationSolutionUpdateSchemaType,
} from '@/types/solution-of-organization/schema'
import { Prisma } from '@prisma/client'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.solutionOfOrganization.findFirst({
          where: {
            id: id,
            softDeleted: false,
          },
        }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
    console.error(error)
    return new Error(error?.message || error)
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
    await prisma.$connect()

    return await request
      .json()
      .then(async (inputs: OrganizationSolutionUpdateSchemaType) => {
        if (await OrganizationSolutionUpdateSchema.parseAsync(inputs)) {
          const { solutionId, organizationId } = inputs

          const solution = await prisma.solution.findFirst({
            where: { id: solutionId },
          })
          if (!solution)
            return new Response(
              JSON.stringify('a solução não existe no sistema'),
              { status: 404 },
            )

          const organization = await prisma.organization.findFirst({
            where: {
              id: organizationId,
            },
          })
          if (!organization)
            return new Response(
              JSON.stringify('a organização não existe no sistema'),
              {
                status: 404,
              },
            )

          const data: Prisma.SolutionOfOrganizationUpdateInput = {
            ...inputs,
            solution: {
              update: {
                id: solutionId,
              },
            },
            organization: {
              update: {
                id: organizationId,
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
          )
        }
      })
  } catch (error: any) {
    await prisma.$disconnect()
    console.error(error)
    return new Error(error?.message || error)
  } finally {
    await prisma.$disconnect()
  }
}
