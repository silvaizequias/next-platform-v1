import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { UpdateProfileAddressDTO, UpdateProfileAddressDTOType } from '../dto'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  try {
    if (session) {
      const inputs: UpdateProfileAddressDTOType = await request.json()
      if (await UpdateProfileAddressDTO.parseAsync(inputs)) {
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
        return new Response(data.body, {
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
