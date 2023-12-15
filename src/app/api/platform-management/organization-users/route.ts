import { authOptions } from '@/libraries/next-auth'
import { getServerSession } from 'next-auth'
import { CreateOrganizationUserDTO, CreateOrganizationUserDTOType } from './dto'
import { UserType } from '@/types/platform-management/user'
import { sendOrganizationUserMessage } from '@/utils/send-message'
import { OrganizationType } from '@/types/platform-management/organization'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  const PLATFORM_API_URL = process.env.PLATFORM_API_URL
  try {
    if (session && session.user.profile == 'MASTER') {
      const data = await fetch(`${PLATFORM_API_URL}/organization-users`, {
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
      const inputs: CreateOrganizationUserDTOType = await request.json()
      if (await CreateOrganizationUserDTO.parseAsync(inputs)) {
        const data = await fetch(`${PLATFORM_API_URL}/organization-users`, {
          method: 'POST',
          body: JSON.stringify(inputs),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${session.user.authorization}`,
          },
        })

        const userData = await fetch(
          `${PLATFORM_API_URL}/users/${inputs?.userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${session.user.authorization}`,
            },
          },
        )

        const organizationData = await fetch(
          `${PLATFORM_API_URL}/organizations/${inputs?.organizationId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${session.user.authorization}`,
            },
          },
        )

        const user: UserType = await userData.json()
        const organization: OrganizationType = await organizationData.json()

        await sendOrganizationUserMessage({
          emailTo: user.email,
          name: user.name,
          organization: organization.name,
          phoneTo: user.phone,
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
