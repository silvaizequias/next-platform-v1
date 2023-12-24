import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions)
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  const { id } = params
  try {
    if (session) {
      const data = await fetch(
        `${PLATFORM_API_URL}/organization-users/user/${id}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${session.user.authorization}`,
          },
        },
      )
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
