import OrganizationActions from '@/components/organizations/actions'

const organizationActions = new OrganizationActions()

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params
  try {
    return new Response(JSON.stringify(await organizationActions.findById(id)))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
