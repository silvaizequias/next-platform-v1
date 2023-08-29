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

          delete inputs?.contractCode

          const data: Prisma.InvoiceCreateInput = {
            ...inputs,
            contract: {
              connect: {
                contractCode: contractCode,
              },
            },
          }
          return new Response(
            JSON.stringify(await prisma.invoice.create({ data })),
          )
        }
      })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
