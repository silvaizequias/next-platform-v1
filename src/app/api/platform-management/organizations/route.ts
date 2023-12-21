import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { CreateOrganizationDTO, CreateOrganizationDTOType } from './dto'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  try {
    if (session && session.user.profile == 'MASTER') {
      const data = await fetch(`${PLATFORM_API_URL}/organizations`, {
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
      const inputs: CreateOrganizationDTOType = await request.json()
      if (await CreateOrganizationDTO.parseAsync(inputs)) {
        const data = await fetch(`${PLATFORM_API_URL}/organizations`, {
          method: 'POST',
          body: JSON.stringify(inputs),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${session.user.authorization}`,
          },
        })

        const newOrganization = await data.json()

        await fetch(`${PLATFORM_API_URL}/organization-users`, {
          method: 'POST',
          body: JSON.stringify({
            role: 'OWNER',
            organizationId: newOrganization?.id,
            userId: session.user?.id,
            isActive: true,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${session.user.authorization}`,
          },
        })

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
