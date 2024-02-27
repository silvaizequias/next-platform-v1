'use server'

import { prisma } from '@/libraries/prisma'
import {
  CreateApiSpendSchema,
  CreateApiSpendSchemaType,
} from '@/schemas/api-spend'
import { Prisma } from '@prisma/client'

export const createApiSpend = async (inputs: CreateApiSpendSchemaType) => {
  try {
    if (await CreateApiSpendSchema.parseAsync(inputs)) {
      const data: Prisma.ApiSpendCreateInput = {
        ...inputs,
      }
      await prisma.apiSpend.create({ data })

      return `consumo registrado`
    }
  } catch (error: any) {
    await prisma.$disconnect()
    return error?.message || error
  } finally {
    await prisma.$disconnect()
  }
}
