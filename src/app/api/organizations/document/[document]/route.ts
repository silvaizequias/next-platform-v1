import { getOrganizationByDocument } from '@/actions/organizations/GET'

export async function GET(
  request: Request,
  { params }: { params: { document: string } },
) {
  const { document } = params
  try {
    return new Response(
      JSON.stringify(await getOrganizationByDocument(document)),
      { status: 200 },
    )
  } catch (error: any) {
    return new Response(error?.message || error, {
      status: error?.status || 400,
    })
  }
}
