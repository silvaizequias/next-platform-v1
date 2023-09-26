import { prisma } from '@/libraries/prisma'
import {
  ApiKeyUpdateScheme,
  ApiKeyUpdateSchemeType,
} from '@/types/api-key/schema'
import { Prisma } from '@prisma/client'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params

  try {
    return new Response(
      JSON.stringify(
        await prisma.apiKey.findFirst({
          where: { id: id, softDeleted: false },
          include: {
            user: {
              select: {
                id: true,
                isActive: true,
                name: true,
                email: true,
                phone: true,
                profile: true,
              },
            },
          },
        }),
      ),
    )
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } 
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<ApiKeyUpdateSchemeType | any> => {
  const { id } = params
  const inputs: ApiKeyUpdateSchemeType = await request.json()
  try {
    if (await ApiKeyUpdateScheme.parseAsync(inputs)) {
      const { userPhone, solutionUrl } = inputs

      const user = await prisma.user.findFirst({
        where: { phone: userPhone, softDeleted: false, isActive: true },
      })
      if (!user)
        return new Response('esta conta não pode contratar serviços', {
          status: 403,
        })

      const solution = await prisma.solution.findFirst({
        where: { url: solutionUrl },
      })
      if (!solution)
        return new Response('a solução não está disponível para contratação', {
          status: 404,
        })

      delete inputs?.userPhone
      delete inputs?.solutionUrl

      const data: Prisma.ApiKeyUpdateInput = {
        ...inputs,
        user: {
          update: {
            id: user?.id!,
          },
        },
        solution: {
          update: {
            id: solution?.id!,
          },
        },
      }
      await prisma.apiKey.update({ where: { id }, data })

      return new Response(JSON.stringify(`a chave foi atualizada!`), {
        status: 201,
      })
    }
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
