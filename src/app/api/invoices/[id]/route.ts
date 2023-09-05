import { prisma } from '@/libraries/prisma'
import { InvoiceUpdateSchema, InvoiceUpdateSchemaType } from '@/schemas/invoice'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id
  try {
    await prisma.$connect()

    return new Response(
      JSON.stringify(
        await prisma.invoice.findFirst({
          where: { id },
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
                    email: true,
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

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id
  try {
    await prisma.$connect()
    return await request
      .json()
      .then(async (inputs: InvoiceUpdateSchemaType) => {
        if (await InvoiceUpdateSchema.parseAsync(inputs)) {
          return new Response(
            JSON.stringify(
              await prisma.invoice.update({ where: { id }, data: inputs }),
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
