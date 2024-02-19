import { getOrganizationKeyByKey } from '@/actions/organization-keys/GET'

export async function GET(
  request: Request,
  { params }: { params: { key: string } },
) {
  const { key } = params
  try {
    return new Response(JSON.stringify(await getOrganizationKeyByKey(key)), {
      status: 200,
    })
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}
