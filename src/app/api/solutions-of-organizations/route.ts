import { prisma } from '@/libraries/prisma'
import {
  OrganizationSolutionCreateSchema,
  OrganizationSolutionCreateSchemaType,
} from '@/types/solution-of-organization/schema'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.solutionOfOrganization.findMany({
          where: {
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

export async function POST(request: Request) {
  try {
    await prisma.$connect()

    return await request
      .json()
      .then(async (inputs: OrganizationSolutionCreateSchemaType) => {
        if (await OrganizationSolutionCreateSchema.parseAsync(inputs)) {
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

          const data: Prisma.SolutionOfOrganizationCreateInput = {
            ...inputs,
            solution: {
              connect: {
                id: solutionId,
              },
            },
            organization: {
              connect: {
                id: organizationId,
              },
            },
          }
          return new Response(
            JSON.stringify(
              await prisma.solutionOfOrganization.create({ data }),
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
