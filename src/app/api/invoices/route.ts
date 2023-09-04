import { prisma } from '@/libraries/prisma'
import { InvoiceCreateSchema, InvoiceCreateSchemaType } from '@/schemas/invoice'
import { Prisma } from '@prisma/client'

export const GET = async (request: Request) => {
  try {
    await prisma.$connect()
    return new Response(
      JSON.stringify(
        await prisma.invoice.findMany({
          include: {
            contract: {
              select: {
                id: true,
                contractCode: true,
                service: true,
                user: {
                  select: {
                    id: true,
                    isActive: true,
                    name: true,
                    phone: true,
                  },
                },
              },
            },
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
      .then(async (inputs: InvoiceCreateSchemaType) => {
        if (await InvoiceCreateSchema.parseAsync(inputs)) {
          const { contractCode } = inputs

          const contract = await prisma.contract.findFirst({
            where: {
              contractCode: contractCode,
            },
          })
          if (!contract)
            return new Response('contract not found', { status: 404 })

          const service = await prisma.service.findFirst({
            where: {
              id: contract?.serviceId,
            },
          })
          if (!service)
            return new Response('service not found', { status: 404 })

          const totalAmount = service?.price!

          delete inputs?.contractCode

          const data: Prisma.InvoiceCreateInput = {
            ...inputs,
            invoiceCode: randomCode,
            amount: totalAmount,
            contract: {
              connect: {
                contractCode: contractCode,
              },
            },
          }
          await prisma.invoice.create({ data })

          return new Response(
            JSON.stringify(JSON.stringify('A fatura foi gerada!')),
          )
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
