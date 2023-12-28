import {
  CreateOrganizationApiKeyDTO,
  CreateOrganizationApiKeyDTOType,
} from './dto'
import { authOptions } from '@/libraries/next-auth'
import { randomUUID } from 'crypto'
import { getServerSession } from 'next-auth'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL

  try {
    if (session) {
      const inputs: CreateOrganizationApiKeyDTOType = await request.json()
      if (await CreateOrganizationApiKeyDTO.parseAsync(inputs)) {
        const { document, expireIn } = inputs

        const data = await fetch(
          `${PLATFORM_API_URL}/organizations/document/${document}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${session.user.authorization}`,
            },
          },
        )

        const organization = await data.json()
        const keyGeneration = randomUUID()

        const update = await fetch(
          `${PLATFORM_API_URL}/organizations/${organization?.id}`,
          {
            method: 'PATCH',
            body: JSON.stringify({
              apiKey: keyGeneration,
              apiExpireIn: expireIn,
            }),
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${session.user.authorization}`,
            },
          },
        )
      }
    }

    return new Response(JSON.stringify('acesso não autorizado'), {
      status: 403,
    })
  } catch (error: any) {
    return new Response(error.message || error, { status: 400 })
  }
}
