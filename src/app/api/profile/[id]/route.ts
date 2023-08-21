import { ProfileUpdateSchema, ProfileUpdateSchemaType } from '@/schemas/profile'
import prisma from '@/libraries/prisma'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const id = params?.id

  try {
    await prisma.$connect()
    return new Response(
      JSON.stringify(await prisma.user.findUnique({ where: { id } })),
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
    return await request.json().then(async (inputs: ProfileUpdateSchemaType) => {
      if (ProfileUpdateSchema.validateSync(inputs)) {
        return new Response(JSON.stringify(inputs))
      }
    })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
