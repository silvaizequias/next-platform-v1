import { UserCreateDTO, UserCreateDTOType } from '@/dto/user.dto'
import { prisma } from '@/libraries/prisma'
import { sendWelcomeMessage } from '@/utils/send-message'
import { Prisma } from '@prisma/client'
import { hashSync } from 'bcrypt'

export async function GET(request: Request) {
  try {
    return new Response(
      JSON.stringify(
        await prisma.user.findMany({
          where: { softDeleted: false },
          select: {
            id: true,
            isActive: true,
            name: true,
            image: true,
            email: true,
            phone: true,
            zipCode: true,
            complement: true,
            latitude: true,
            longitude: true,
            organizations: {
              select: {
                id: true,
                isActive: true,
                role: true,
                organization: {
                  select: {
                    id: true,
                    image: true,
                    name: true,
                    phone: true,
                    email: true,
                    documentCode: true,
                    zipCode: true,
                    complement: true,
                    latitude: true,
                    longitude: true,
                  },
                },
              },
            },
          },
        }),
      ),
      {
        status: 200,
      },
    )
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: Request) {
  const randomCode = Math.random().toString(32).substr(2, 14).toUpperCase()

  try {
    const inputs: UserCreateDTOType = await request.json()
    if (await UserCreateDTO.parseAsync(inputs)) {
      const { name, email, phone } = inputs

      const data: Prisma.UserCreateInput = {
        ...inputs,
        passHash: hashSync(randomCode, 10),
      }
      await sendWelcomeMessage({
        name: name,
        emailTo: email,
        phoneTo: phone,
        password: randomCode,
      })
      await prisma.user.create({ data: data })
      return new Response(JSON.stringify(`o usuario ${name} foi criado`), {
        status: 201,
      })
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return new Response(error?.message || error, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
