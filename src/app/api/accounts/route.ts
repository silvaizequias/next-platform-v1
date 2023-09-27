import { prisma } from '@/libraries/prisma'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  try {
    return new NextResponse(
      JSON.stringify(
        await prisma.account.findMany({
          where: { softDeleted: false },
        }),
      ),
    )
  } catch (error: any) {
    return new NextResponse(error?.message || error)
  }
}
