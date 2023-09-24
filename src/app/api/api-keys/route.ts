import { prisma } from '@/libraries/prisma'
import {
  ApiKeyCreateScheme,
  ApiKeyCreateSchemeType,
} from '@/types/api-key/schema'
import { Prisma } from '@prisma/client'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.apiKey.findMany({
          where: { softDeleted: false },
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
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export const POST = async (
  request: Request,
): Promise<ApiKeyCreateSchemeType | any> => {
  const randomKey = 'sd-' + crypto.randomUUID()

  try {
    await prisma.$connect()

    return await request.json().then(async (inputs: ApiKeyCreateSchemeType) => {
      if (await ApiKeyCreateScheme.parseAsync(inputs)) {
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
          return new Response(
            'a solução não está disponível para contratação',
            { status: 404 },
          )

        delete inputs?.userPhone
        delete inputs?.solutionUrl

        const data: Prisma.ApiKeyCreateInput = {
          ...inputs,
          key: randomKey,
          user: {
            connect: {
              id: user?.id!,
            },
          },
          solution: {
            connect: {
              id: solution?.id!,
            },
          },
        }
        await prisma.apiKey.create({ data })

        return new Response(
          JSON.stringify(
            `a chave API foi gerada e enviada para o e-mail ${user?.email!}`,
          ),
        )
      }
    })
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
