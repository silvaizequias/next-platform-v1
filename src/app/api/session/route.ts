import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(nextAuthOptions)
    return new Response(JSON.stringify(session), { status: 200 })
  } catch (error: any) {
    return new Response(error?.message || error, { status: 400 })
  }
}
