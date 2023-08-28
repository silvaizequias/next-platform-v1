import { prisma } from '@/libraries/prisma'
import {
  ContractCreateSchema,
  ContractCreateSchemaType,
} from '@/schemas/contract'
import { Prisma } from '@prisma/client'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()

    return new Response(JSON.stringify(await prisma.contract.findMany()))
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export const POST = async (request: Request) => {
  try {
    await prisma.$connect()
    return await request
      .json()
      .then(async (inputs: ContractCreateSchemaType) => {
        if (await ContractCreateSchema.parseAsync(inputs)) {
          const { userPhone, serviceCode } = inputs

          const user = await prisma.user.findFirst({
            where: { phone: userPhone },
          })
          if (!user) return new Response('user not found', { status: 404 })

          const service = await prisma.service.findFirst({
            where: { serviceCode: serviceCode },
          })
          if (!service)
            return new Response('service not found', { status: 404 })

          delete inputs?.userPhone
          delete inputs?.serviceCode

          const data: Prisma.ContractCreateInput = {
            ...inputs,
            user: {
              connect: {
                phone: userPhone,
              },
            },
            service: {
              connect: {
                serviceCode: serviceCode,
              },
            },
          }

          return new Response(
            JSON.stringify(await prisma.contract.create({ data })),
          )
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
