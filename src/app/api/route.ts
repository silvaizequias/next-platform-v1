import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'

export const GET = async (request: Request) => {
  const session = await getServerSession(authOptions)

  try {
    return new Response(JSON.stringify(session))
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: 400,
    })
  }
}
