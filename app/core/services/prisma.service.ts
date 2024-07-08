import { environment } from '@/environments'
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export default class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: environment.DATABASE_URL,
        },
      },
    })
  }
}
