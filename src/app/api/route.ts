import { authOptions } from "@/libraries/next-auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
  const session = await getServerSession(authOptions)

  try {
    return new NextResponse(JSON.stringify(session))
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}

export const POST = async (request: Request): Promise<any> => {
  const inputs = await request.json()
  try {
    if (inputs) {
      return new NextResponse(JSON.stringify(inputs), { status: 201 })
    }
  } catch (error: any) {
    return new NextResponse(error?.message! || error!, { status: 400 })
  }
}
