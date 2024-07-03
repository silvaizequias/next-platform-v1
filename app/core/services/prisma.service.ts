import { environment } from '@/environments'
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export class PrismaService {
  readonly client =
    global.prisma ||
    new PrismaClient({
      datasources: {
        db: {
          url: environment.DATABASE_URL,
        },
      },
    })
}
