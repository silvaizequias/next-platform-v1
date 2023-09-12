import { PrismaClient } from '@prisma/client'
import { PrismaClient as PrismaClientDriving } from '../../../node_modules/@schema-generations/client/driving'

declare global {
  var prisma: PrismaClient | undefined
  var prismaDriving: PrismaClientDriving | undefined
}

export const prisma = global.prisma || new PrismaClient()
export const prismaDriving = global.prismaDriving || new PrismaClientDriving()

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
  global.prismaDriving = prismaDriving
}
