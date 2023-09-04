import { prisma } from '@/libraries/prisma'
import {
  ContractCreateSchema,
  ContractCreateSchemaType,
} from '@/schemas/contract'
import { invoiceGenerator } from '@/services/invoice-generator'
import { Prisma } from '@prisma/client'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.contract.findMany({
          include: {
            user: {
              select: {
                id: true,
                phone: true,
                email: true,
                isActive: true,
                name: true,
              },
            },
            invoices: {
              select: {
                id: true,
                invoiceCode: true,
                amount: true,
                status: true,
              },
            },
            service: true,
          },
        }),
      ),
    )
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export const POST = async (request: Request) => {
  const randomCode = Math.random().toString(32).substr(2, 12).toUpperCase()

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
            contractCode: randomCode,
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
          await prisma.contract.create({ data }).then(async (res) => {
            await prisma.invoice.create({
              data: {
                invoiceCode: randomCode,
                contractId: res.id,
                payUpTo: new Date(Date.now()),
                amount: service?.price,
              },
            })
          })

          return new Response(
            JSON.stringify(
              JSON.stringify(
                'O contrato foi criado e a fatura para pagamento do serviço gerada!',
              ),
            ),
          )
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
