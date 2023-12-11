import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { UpdateProfileDTO, UpdateProfileDTOType } from './dto'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  try {
    if (session) {
      const data = await fetch(`${PLATFORM_API_URL}/users/${session.user.id}`, {
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

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  try {
    if (session) {
      const inputs: UpdateProfileDTOType = await request.json()
      if (await UpdateProfileDTO.parseAsync(inputs)) {
        const data = await fetch(
          `${PLATFORM_API_URL}/users/${session.user.id}`,
          {
            method: 'PATCH',
            body: JSON.stringify(inputs),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.user.authorization}`,
            },
          },
        )
        return new Response(JSON.stringify(await data.json()), {
          status: data.status,
        })
      }
    }

    return new Response(JSON.stringify('acesso não autorizado'), {
      status: 403,
    })
  } catch (error: any) {
    return new Response(error.message || error, { status: 400 })
  }
}
