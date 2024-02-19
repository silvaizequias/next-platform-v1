import { getOrganizationKeys } from '@/repositories/organization-keys/GET'
import { postOrganizationKey } from '@/repositories/organization-keys/POST'
import { CreateOrganizationKeySchemaType } from '@/schemas/organization-key.schema'

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await getOrganizationKeys()), {
      status: 200,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}

export async function POST(request: Request) {
  const inputs: CreateOrganizationKeySchemaType = await request.json()
  try {
    return new Response(JSON.stringify(await postOrganizationKey(inputs)), {
      status: 201,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}
