import { prisma } from '@/libraries/prisma'
import {
  OrganizationSolutionCreateSchema,
  OrganizationSolutionCreateSchemaType,
} from '@/types/solution-of-organization/schema'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  try {
    return new NextResponse(
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
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}

export const POST = async (
  request: Request,
): Promise<OrganizationSolutionCreateSchemaType | any> => {
  const inputs: OrganizationSolutionCreateSchemaType = await request.json()
  try {
    if (await OrganizationSolutionCreateSchema.parseAsync(inputs)) {
      const { solutionUrl, organizationCnpj } = inputs

      const solution = await prisma.solution.findFirst({
        where: { url: solutionUrl },
      })
      if (!solution)
        return new NextResponse('a solução não existe no sistema', {
          status: 404,
        })

      const organization = await prisma.organization.findFirst({
        where: {
          cnpj: organizationCnpj,
        },
      })
      if (!organization)
        return new NextResponse('a organização não existe no sistema', {
          status: 404,
        })

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
      return new NextResponse(
        JSON.stringify(await prisma.solutionOfOrganization.create({ data })),
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}
