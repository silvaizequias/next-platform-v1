import OrganizationActions from '@/components/organizations/actions'

const organizationActions = new OrganizationActions()

export async function GET(
  request: Request,
  { params }: { params: { document: string } },
) {
  const { document } = params
  try {
    return new Response(
      JSON.stringify(await organizationActions.findByDocument(document)),
    )
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
