import { prisma } from '@/libraries/prisma'
import { UserUpdateSchema, UserUpdateSchemaType } from '@/types/user/schema'
import { NextResponse } from 'next/server'

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { id } = params
  try {
    return new NextResponse(
      JSON.stringify(
        await prisma.user.findFirst({
          where: { id: id, softDeleted: false },
          include: {
            subscriptions: true,
            organizations: true,
            orgs: {
              select: {
                role: true,
                isAvaliable: true,
                organization: {
                  select: {
                    id: true,
                    name: true,
                    cnpj: true,
                  },
                },
              },
            },
          },
        }),
      ),
    )
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<UserUpdateSchemaType | any> => {
  const { id } = params
  const inputs: UserUpdateSchemaType = await request.json()
  try {
    if (await UserUpdateSchema.parseAsync(inputs)) {
      await prisma.user.update({ where: { id }, data: inputs })
      return new NextResponse(JSON.stringify('as informações foram atualizadas!'), {
        status: 201,
      })
    }
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}
