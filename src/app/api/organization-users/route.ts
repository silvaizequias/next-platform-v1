import { getOrganizationUsers } from '@/repositories/organization-users/GET'
import { postOrganizationUser } from '@/repositories/organization-users/POST'
import { CreateOrganizationUserSchemaType } from '@/schemas/organization-user.schema'

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await getOrganizationUsers()), {
      status: 200,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}

export async function POST(request: Request) {
  const inputs: CreateOrganizationUserSchemaType = await request.json()
  try {
    return new Response(JSON.stringify(await postOrganizationUser(inputs)), {
      status: 201,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}
