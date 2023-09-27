import { prisma } from '@/libraries/prisma'
import {
  ApiKeyRequestSchema,
  ApiKeyRequestSchemaType,
} from '@/types/api-key/schema'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export const POST = async (
  request: Request,
): Promise<ApiKeyRequestSchemaType | any> => {
  const inputs: ApiKeyRequestSchemaType = await request.json()
  try {
    if (await ApiKeyRequestSchema.parseAsync(inputs)) {
      const { key } = inputs

      const apiKey = await prisma.apiKey.findFirst({
        where: { key: key, softDeleted: false },
      })
      if (!apiKey) return new NextResponse('chave não encontrada!', { status: 404 })

      const monthlyRequestLimit = apiKey?.monthlyRequestLimit!
      const monthlyRequests = apiKey?.monthlyRequests!
      const dailyRequestLimit = apiKey?.dailyRequestLimit!
      const dailyRequests = apiKey?.dailyRequests!

      if (monthlyRequestLimit >= monthlyRequests) {
        return new NextResponse('limite de requisições do mês atingido!', {
          status: 403,
        })
      }

      if (dailyRequestLimit >= dailyRequests) {
        return new NextResponse('limite de requisições do dia atingido!', {
          status: 403,
        })
      }

      const requestCount = dailyRequests + 1

      const data: Prisma.ApiKeyUpdateInput = {
        ...inputs,
        dailyRequests: requestCount,
      }
      await prisma.apiKey.update({ where: { key: key }, data })

      return (
        new Response(
          JSON.stringify(`${dailyRequests}/${monthlyRequestLimit} requisições`),
        ),
        { status: 201 }
      )
    }
  } catch (error: any) {
    return new NextResponse(error?.message || error, { status: 400 })
  }
}
