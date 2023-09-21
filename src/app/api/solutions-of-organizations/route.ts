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
          include: {
            solution: true,
            organization: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    await prisma.$disconnect()
    console.error(error)
    return new Response(JSON.stringify(error?.message || error), { status: 400 })
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
          const { solutionUrl, organizationCnpj } = inputs

          const solution = await prisma.solution.findFirst({
            where: { url: solutionUrl },
          })
          if (!solution)
            return new Response(
              JSON.stringify('a solução não existe no sistema'),
              { status: 404 },
            )

          const organization = await prisma.organization.findFirst({
            where: {
              cnpj: organizationCnpj,
            },
          })
          if (!organization)
            return new Response(
              JSON.stringify('a organização não existe no sistema'),
              {
                status: 404,
              },
            )

          delete inputs?.solutionUrl
          delete inputs?.organizationCnpj

          const data: Prisma.SolutionOfOrganizationCreateInput = {
            ...inputs,
            solution: {
              connect: {
                id: solution?.id!,
              },
            },
            organization: {
              connect: {
                id: organization?.id!,
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
    return new Response(JSON.stringify(error?.message || error), { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
