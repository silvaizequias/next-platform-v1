import { prisma } from '@/libraries/prisma'
import { ResetPasswordCodeDTO, ResetPasswordCodeDTOType } from '../dto'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export async function GET(
  request: Request,
  { params }: { params: { code: string } },
) {
  const code: ResetPasswordCodeDTOType = { accessCode: params.code }
  const randomCode = Math.random().toString(32).substr(2, 14)
  try {
    if (await ResetPasswordCodeDTO.parseAsync(code)) {
      const { accessCode } = code

      const user = await prisma.user.findFirst({
        where: { accessCode: accessCode, softDeleted: false, active: false },
      })
      if (!user)
        return new Response(JSON.stringify(`o código informado não é válido`), {
          status: 403,
        })

      const data: Prisma.UserUpdateInput = {
        active: true,
        passHash: hashSync(randomCode, 10),
      }
      await prisma.user.update({ where: { id: user?.id }, data })

      return new Response(
        JSON.stringify(`a senha foi redefinida: ${randomCode}`),
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
