import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { UpdateProfilePasswordDTO, UpdateProfilePasswordDTOType } from '../dto'
import { hashSync } from 'bcrypt'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  try {
    if (session) {
      const inputs: UpdateProfilePasswordDTOType = await request.json()
      if (await UpdateProfilePasswordDTO.parseAsync(inputs)) {
        const data = await fetch(
          `${PLATFORM_API_URL}/users/${session.user.id}`,
          {
            method: 'PATCH',
            body: JSON.stringify({
              passHash: hashSync(inputs.newPassword, 10),
            }),
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
