import { nextAuthOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'

export async function GET(request: Request) {
  const session = await getServerSession(nextAuthOptions)
  try {
    if (session) return new Response(JSON.stringify(session))
    return new Response(JSON.stringify('acesso não autorizado'), {
      status: 403,
    })
  } catch (error: any) {
    return new Response(error.message || error, { status: 400 })
  }
}
