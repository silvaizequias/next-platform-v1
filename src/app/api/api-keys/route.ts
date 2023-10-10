import { prisma } from '@/libraries/prisma'
import { sendApiKeyEmail } from '@/libraries/sendgrid/templates'
import { SendGridTemplateProps } from '@/libraries/sendgrid/types'
import {
  ApiKeyCreateScheme,
  ApiKeyCreateSchemeType,
} from '@/types/api-key/schema'
import { Prisma } from '@prisma/client'
import * as crypto from 'crypto'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  try {
    return new NextResponse(
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
    return new NextResponse(error?.message || error, { status: 400 })
  }
}

export const POST = async (
  request: Request,
): Promise<ApiKeyCreateSchemeType | any> => {
  const randomKey = 'SD_' + crypto.randomBytes(16).toString('hex')

  try {
    const inputs: ApiKeyCreateSchemeType = await request.json()
    if (await ApiKeyCreateScheme.parseAsync(inputs)) {
      const { userPhone, solutionUrl } = inputs

      const user = await prisma.user.findFirst({
        where: { phone: userPhone, softDeleted: false, isActive: true },
      })
      if (!user)
        return new NextResponse('esta conta não pode contratar serviços', {
          status: 403,
        })

      const solution = await prisma.solution.findFirst({
        where: { url: solutionUrl },
      })
      if (!solution)
        return new NextResponse('a solução não está disponível para contratação', {
          status: 404,
        })

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

      const sendEmail: SendGridTemplateProps = {
        name: user?.name!,
        email: user?.email!,
        key: randomKey,
      }
      await sendApiKeyEmail(sendEmail)

      return new NextResponse(
        JSON.stringify(
          `a chave API foi gerada e enviada para o e-mail ${user?.email!}`,
        ),
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new NextResponse(error?.message || error, { status: 400 })
  } finally {
  }
}
