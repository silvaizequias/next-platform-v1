import { prisma } from '@/libraries/prisma'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { UpdateUserDTOType, UpdateUserDTO } from '../dto'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    return new Response(
      JSON.stringify(
        await prisma.user.findFirst({
          where: { id: id, softDeleted: false },
          include: {
            organizations: {
              select: {
                role: true,
                organization: {
                  select: {
                    id: true,
                    name: true,
                    documentCode: true,
                  },
                },
              },
            },
          },
        }),
      ),
      { status: 200 },
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    const inputs: UpdateUserDTOType = await request.json()
    if (await UpdateUserDTO.parseAsync(inputs)) {
      const { password } = inputs

      const user = await prisma.user.findFirst({
        where: { id: id },
      })
      if (!user)
        return new Response(
          JSON.stringify(
            `o id ${id} do usuário não foi encotrado na plataforma`,
          ),
          { status: 404 },
        )

      if (password) {
        const data: Prisma.UserUpdateInput = {
          ...inputs,
          passHash: hashSync(password, 10),
        }
        await prisma.user.update({ where: { id: id }, data })
        return new Response(
          JSON.stringify(
            `as informações do usuário ${data.name} foram atualizadas`,
          ),
          { status: 201 },
        )
      }

      const data: Prisma.UserUpdateInput = {
        ...inputs,
      }
      await prisma.user.update({ where: { id: id }, data })
      return new Response(
        JSON.stringify(
          `as informações do usuário ${data.name} foram atualizadas`,
        ),
        { status: 201 },
      )
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  } finally {
    await prisma.$disconnect()
  }
}
