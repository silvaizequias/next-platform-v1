import OrganizationsService from '@/services/organizations.service'

const organizationsService = new OrganizationsService()

export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify(await organizationsService.findAll()))
  } catch (error: any) {
    return new Response(error?.message, { status: error?.status })
  }
}
