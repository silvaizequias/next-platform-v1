import { prisma } from '@/libraries/prisma'
import { ResetPasswordDTO, ResetPasswordDTOType } from './dto'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
  const randomCode = Math.random().toString(32).substr(2, 6).toUpperCase()

  try {
    const input: ResetPasswordDTOType = await request.json()
    if (await ResetPasswordDTO.parseAsync(input)) {
      const { phone } = input

      const user = await prisma.user.findFirst({
        where: { phone: phone },
      })

      if (!user)
        return new Response(
          JSON.stringify(`o número ${phone} não possui registro ativo na plataforma`),
          { status: 404 },
        )

      const data: Prisma.UserUpdateInput = {
        active: false,
        accessCode: randomCode,
      }
      await prisma.user.update({ where: { id: user?.id }, data })

      return new Response(
        JSON.stringify(`utilize o código ${randomCode} para redefinir a senha`),
        { status: 201 },
      )
    }
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
