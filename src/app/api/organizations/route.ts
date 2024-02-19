import { getOrganizations } from '@/actions/organizations/GET'
import { postOrganization } from '@/actions/organizations/POST'

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await getOrganizations()), {
      status: 200,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}

export async function POST(request: Request) {
  const inputs = await request.json()
  try {
    return new Response(JSON.stringify(await postOrganization(inputs)), {
      status: 201,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}
