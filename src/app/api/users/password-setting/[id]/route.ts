import { prisma } from '@/libraries/prisma'
import {
  UserPasswordSettingSchema,
  UserPasswordSettingSchemaType,
} from '@/types/user/schema'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
): Promise<any> => {
  const { id } = params
  const inputs: UserPasswordSettingSchemaType = await request.json()
  try {
    if (await UserPasswordSettingSchema.parseAsync(inputs)) {
      const { password } = inputs

      const passHash = bcrypt.hashSync(password, 10)

      const data: Prisma.UserUpdateInput = {
        passHash: passHash,
      }
      await prisma.user.update({ where: { id }, data })

      return new NextResponse('a senha foi definida!', { status: 201 })
    }
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}
