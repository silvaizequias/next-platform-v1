import OrganizationsService from '@/services/organizations.service'

export async function GET(request: Request) {
  const allOrganizations = new OrganizationsService().findAll()

  return new Response(JSON.stringify(await allOrganizations))
}
