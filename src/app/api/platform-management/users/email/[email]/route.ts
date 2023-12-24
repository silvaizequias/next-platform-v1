import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'

export async function GET(
  request: Request,
  { params }: { params: { email: string } },
) {
  const { email } = params
  const session = await getServerSession(authOptions)
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  try {
    if (session) {
      const data = await fetch(`${PLATFORM_API_URL}/users/email/${email}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${session.user.authorization}`,
        },
      })
      return new Response(JSON.stringify(await data.json()), {
        status: data.status,
      })
    }

    return new Response(JSON.stringify('acesso não autorizado'), {
      status: 403,
    })
  } catch (error: any) {
    return new Response(error.message || error, { status: 400 })
  }
}
